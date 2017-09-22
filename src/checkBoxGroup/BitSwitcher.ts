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



export default class BitSwitcher<T>{

    status:number=0;
    mask:number;
    map:Map<T,number>;
    constructor(...keys:T[] ){
        if(!keys||keys.length==0)throw new Error("");

        this.status=0;
        this.mask = Math.pow(2,keys.length)-1;
        this.map= new Map(keys.map((e,index):[T,number]=>{
            return [e,1<<index]
        }))

    }

    isAllOn(){
        return this.status ==this.mask;
    }

    /*有一个开即为开*/
    isOn(flag?:T){
        if(flag){
            return (this.status & this._getFlagVal(flag)) !=0
        }
        return this.status!=0
    }

    on(flag?:T){
        this.status = this.status | this._getFlagVal(flag)
        this._readable()
        return this;
    }

    off(flag:T){
        let flagVMask = this._getFlagVal(flag)^this.mask
        this.status = flagVMask&this.status
        this._readable()
        return this;
    }

    private _getFlagVal(flag?:T):number{
        if(flag&&this.map.has(flag)){
            let v= this.map.get(flag);
            if(v==null)return 0;
            return v;
        }
        console.warn(`the key "${flag}" is not a valid one,please pick one from "${[...this.map.keys()].join(",")}"`)
        return 0
    }

    _readable(){
        console.log("_readable",this.status.toString(2))
    }


}