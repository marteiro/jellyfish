import { LineBasicMaterial, Object3D } from "three";
import JellyEdge from "./JellyEdge";
import JellyHeadCircle from "./JellyHeadCircle";


export default class JellyHead extends Object3D {
    private _controllerMaterial = new LineBasicMaterial({ color: 0x8888ff })

    private _edges = new Array<JellyEdge>(0);

    private _controllers = [
        new JellyHeadCircle(1, 0, this._controllerMaterial),
        new JellyHeadCircle(4, -.5, this._controllerMaterial),
        new JellyHeadCircle(5, -4, this._controllerMaterial),
        new JellyHeadCircle(4, -5, this._controllerMaterial),
    ]

    constructor(edgeCount: number, headMaterial: LineBasicMaterial) {
        super();

        this._controllers.forEach(circle => this.add(circle))

        // for (let i = 0; i < edgeCount; i++) {
        //     let edge = new JellyEdge(headMaterial);
        //     this.add(edge)
        //     this._edges.push(edge);
        //     edge.rotateX(Math.PI * 2 / edgeCount * i);
        // }
    }

    update(time: number) {
        const headTail = this._controllers[3];

        headTail.radius = 4 + (Math.sin(Math.PI * time) * .75);
        headTail.position.y = -5 - (Math.cos(Math.PI * time) * .75)
    }
}