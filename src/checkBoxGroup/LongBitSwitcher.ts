/**
 * Created by syjmac on 2017/8/23.
 *
 *开关器 可以设置任意位数的开关位 并且灵活控制每位的开关状态
 *
 * 参数不与许空字符串和 0  之类本身为false的值
 *
 *
 let a=new Switcher("over","xx","v","a")
 a.on("over").on("v").on("a").off("v").off()
 console.log(a.isOn("a"));
 console.log(a.isOn("over"));
 console.log(a.isOn());

 console output
 _readable 1
 _readable 101
 _readable 1101
 _readable 1001
 _readable 1001
 true
 true
 true
 */
import {IBitSwitcher} from "./BitSwitcher";

export default class LongBitSwitcher<T> implements IBitSwitcher<T> {

	readonly MAX_LEN: number = Infinity;

	private map: Map<T,boolean>;

	constructor(...keys: T[]) {
		if (!keys || keys.length == 0)throw new Error("开关不能空，需要至少一个位");
		this.map = new Map(keys.map((e): [T, boolean] => [e, false]))
	}

	getKeys() {
		return this.map.keys();
	}

	isAllOn() {
		let values = [...this.map.values()]
		return values.indexOf(false) == -1;
	}

	/*有一个开即为开*/
	isOn(flag?: T) {
		if (flag) {
			return !!(this.map.has(flag) ? this.map.get(flag) : false)
		}
		return [...this.map.values()].indexOf(true) != -1
	}

	on(flag?: T) {
		if (flag && this.map.has(flag)) {
			this.map.set(flag, true)
		}
		return this;
	}

	off(flag: T) {
		if (flag && this.map.has(flag)) {
			this.map.set(flag, false)
		}
		return this;
	}

	/*把自己的key对应的状态位从目标对象上拷贝下来*/
	copyFrom(from: IBitSwitcher<T>) {
		let fromKeysArr = [...from.getKeys()]
		for (let key of this.getKeys()) {
			if (fromKeysArr.indexOf(key) !== -1) {
				let isOn = from.isOn(key);
				isOn ? (this.on(key)) : (this.off(key));
			}
		}
		return this;
	}

	/*对比是否有一样的开关位,返回不同的数组*/
	switcherDiff(target: IBitSwitcher<T>|Array<T>) {
		let thisK = this.getKeys(), arr1 = [...thisK].sort(), arr2;
		if (target instanceof Array) {
			arr2 = target.sort()
		} else {
			let targetK = target.getKeys();
			arr2        = [...targetK].sort();
		}

		let added: T[]   = [],//自己没有的但是target里有
		    deleted: T[] = [];//自己原本有但是target里面没有了
		if (arr1.join("-") == arr2.join("-"))return {
			added, deleted, diff: false
		};

		let uniqueAll = new Set(arr1.concat(arr2));
		for (let unique of uniqueAll) {
			let originHas = arr1.includes(unique);
			let nowHas    = arr2.includes(unique);
			if (originHas != nowHas) {//不是都有就是不同
				(originHas ? deleted : added).push(unique)
			}
		}
		return {
			added, deleted, diff: !(added.length == deleted.length && deleted.length == 0)
		}
	}

}