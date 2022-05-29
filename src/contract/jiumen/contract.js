export async function handle(state, action) {

  function deepMerge(src, target) {
    let key = '';
    for (key in target) {
      src[key] = Object.keys(src[key]).length === 0 ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
  }

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
      for (nodeId in action.input.data.deleted) {
        Reflect.deleteProperty(state.docs, nodeId);
      }
      deepMerge(state.docs, action.input.data.updated);
      Object.assign(state.docs, action.input.data.created);
      return { state };
    }

    case "setGraph": {
      checkedMember(action.caller)
      for (cell in action.input.data.updated) {
        state.graph[cell.oldIndex] = deepMerge(state.graph[cell.oldIndex], cell)
      }
      const deleted_length = action.input.data.deleted.length;
      if (deleted_length > 0) {
        for (let i = deleted_length; i > 0; i--) {
          state.graph.splice(action.input.data.deleted[i], 1)
        }
      }
      state.graph = [...state.graph, ...action.input.data.created];
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
