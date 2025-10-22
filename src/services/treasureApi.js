class TreasureApi {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }

  // 新增的寻宝情节
  static exploreAncientRuins() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.3) {
          reject("废墟突然坍塌，你不得不撤退!");
        } else {
          resolve("在废墟深处发现了一幅古老的地图!");
        }
      }, 2000);
    });
  }

  static decipherMap(map) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("地图指向一座隐藏在瀑布后的洞穴!");
      }, 1500);
    });
  }

  static navigateCave() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.4) {
          reject("洞穴内道路复杂，你迷失了方向!");
        } else {
          resolve("成功穿越洞穴，发现了一个密室!");
        }
      }, 2000);
    });
  }

  static solvePuzzle() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("你解开了古老机关，宝箱出现了!");
      }, 2500);
    });
  }
}

export default TreasureApi;