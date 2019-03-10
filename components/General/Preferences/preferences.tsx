import React from 'react';

export default class CommonDataManager {
  static myInstance: any = null;

  static getInstance() {
    if (CommonDataManager.myInstance == null) {
      CommonDataManager.myInstance = new CommonDataManager();
    }

    return this.myInstance;
  }
}
