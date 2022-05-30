export async function handle(state, action) {

  function isMember(member) {
    return state.members.includes(member)
  }

  function checkedMember(member) {
    if (!isMember(member)) {
      throw new ContractError(
        `Membership rights required!`);
    }
  }

  switch (action.input.function) {

    case "setDocs": {
      checkedMember(action.caller)
      for (const nodeId of action.input.data.deleted) {
        Reflect.deleteProperty(state.docs, nodeId);
      }
      Object.assign(state.docs, action.input.data.updated);
      return { state };
    }

    case "setGraph": {
      checkedMember(action.caller)
      for (let cell of action.input.data.updated) {
        const oldIndex = cell.oldIndex
        Reflect.deleteProperty(cell, oldIndex);
        state.graph[oldIndex] = cell
      }
      const deletedLength = action.input.data.deleted.length;
      if (deletedLength > 0) {
        for (let i = deletedLength; i > 0; i--) {
          state.graph.splice(action.input.data.deleted[i], 1)
        }
      }
      // Keep the layers in order!
      for (let cell of action.input.data.created) {
        const newIndex = cell.oldIndex
        Reflect.deleteProperty(cell, newIndex);
        state.graph[newIndex] = cell
      }
      return { state };
    }

    case "addMembers": {
      checkedMember(action.caller)
      const newMember = action.input.data.member;
      if (state.members.includes(newMember)) {
        throw new ContractError(
          `[${newMember}] is already member`);
      }
      state.members.push(newMember);
      return { state };
    }

    case "removeMembers": {
      checkedMember(action.caller)
      if (state.members.length === 0) {
        throw new ContractError(
          `Unable to remove the last member`);
      }
      const member = action.input.data.member;
      const memberIndex = state.members.indexOf(member)
      if (memberIndex === -1) {
        throw new ContractError(
          `[${newMember}] is not a member`);
      } else {
        state.members.splice(memberIndex, 1)
      }
      return { state };
    }

    case "members": {
      return { result: state.members }
    }

    case "name": {
      return { result: state.name };
    }

    default: {
      throw new ContractError(
        `Unsupported contract function: ${functionName}`);
    }

  }
}
