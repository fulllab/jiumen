export interface Job {
  jobFn(ops: any): void,
  ops: any
}

export const queue = new Set<Job>()
export let inFlush = false

export function jobFlush() {
  if (inFlush) return
  inFlush = true
  setTimeout(()=>{
    queue.forEach((job: Job) => {
      job.jobFn(job.ops)
    });
  },10000)
}

export function pushJob(job: Job) {
  queue.add(job)
}

export function removeJob(job: Job) {
  queue.delete(job)
}
