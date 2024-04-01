import { IInfo } from '@/type'
import { makeAutoObservable } from 'mobx'

class UserStore {
  user = {
    id: 0,
    enterpriseId: 0
  }

  constructor() {
    makeAutoObservable(this)
  }

  setInfo(info: IInfo) {
    this.user = info
  }

  get userInfo() {
    return this.user
  }
}

export const userStore = new UserStore()
