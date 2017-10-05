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



export default class BitSwitcher<T> {

	status: number = 0;
	mask: number;
	map: Map<T,number>;

	constructor(...keys: T[]) {
		if (!keys || keys.length == 0)throw new Error("");

		this.status = 0;
		this.mask   = Math.pow(2, keys.length) - 1;
		this.map    = new Map(keys.map((e, index): [T, number] => {
			return [e, 1 << index]
		}))

	}

	isAllOn() {
		return this.status == this.mask;
	}

	/*有一个开即为开*/
	isOn(flag?: T) {
		if (flag) {
			return (this.status & this._getFlagVal(flag)) != 0
		}
		return this.status != 0
	}

	on(flag?: T) {
		this.status = this.status | this._getFlagVal(flag)
		this._readable()
		return this;
	}

	off(flag: T) {
		let flagVMask = this._getFlagVal(flag) ^ this.mask
		this.status   = flagVMask & this.status
		this._readable()
		return this;
	}

	/*把自己的key对应的状态位从目标对象上拷贝下来*/
	copyFrom(from: BitSwitcher<T>) {
		for (let key of this.map.keys()) {
			let isOn = from.isOn(key);
			isOn ? (this.on(key)) : (this.off(key));
		}
		return this;
	}

	/*对比是否有一样的开关位,返回不同的数组*/
	switcherDiff(target: BitSwitcher<T>|Array<T>): {
		added: T[];
		deleted: T[]
		diff: boolean
	} {
		let thisK = this.map.keys(), arr1 = [...thisK].sort(), arr2;
		if (target instanceof BitSwitcher) {
			let targetK = target.map.keys();
			arr2        = [...targetK].sort();
		} else {
			arr2 = target.sort()
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

	private _getFlagVal(flag?: T): number {
		if (flag && this.map.has(flag)) {
			let v = this.map.get(flag);
			if (v == null)return 0;
			return v;
		}
		__DEV__ && console.warn(`the key "${flag}" is not a valid one,please pick one from "${[...this.map.keys()].join(",")}"`)
		return 0
	}

	_readable() {
		console.log("_readable", this.status.toString(2))
	}

}