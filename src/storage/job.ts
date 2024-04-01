import { IInfo } from '@/type'
import { makeAutoObservable } from 'mobx'

class JobStore {
  job = {}

  constructor() {
    makeAutoObservable(this)
  }

  setInfo(info) {
    this.job = info
  }

  get jobInfo() {
    return this.job
  }
}

export const jobStore = new JobStore()
