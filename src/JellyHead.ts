import { LineBasicMaterial, Object3D, PointsMaterial } from "three";
import JellyEdge from "./JellyEdge";
import JellyHeadCircle from "./JellyHeadCircle";


export default class JellyHead extends Object3D {
    private _controllerMaterial = new LineBasicMaterial({ color: 0x8888ff })

    private _edgeValues: number[];
    private _edges: Array<JellyEdge>;

    private _controllers = [
        new JellyHeadCircle(.1, .4, this._controllerMaterial),
        new JellyHeadCircle(2, .3, this._controllerMaterial),
        new JellyHeadCircle(4, -1, this._controllerMaterial),
        new JellyHeadCircle(5, -4, this._controllerMaterial),
        new JellyHeadCircle(4, -5, this._controllerMaterial),
    ]

    constructor(edgeCount: number, headMaterial: LineBasicMaterial, pointsMaterial: PointsMaterial) {
        super();

        // this._controllers.forEach(circle => this.add(circle))

        this._edges = [...new Array(edgeCount)].map((_, i) => {
            const edge = new JellyEdge(Math.random(), headMaterial, pointsMaterial);
            edge.edgeStart = .1 + Math.random() * .4;
            edge.edgeEnd = Math.random() * .1 + .9;
            return edge
        })
        this.add(...this._edges)
    }

    update(time: number) {
        const headTail = this._controllers[this._controllers.length - 1];
        const loopTime = Math.PI * time;

        // last ring motion
        headTail.radius = 4 + (Math.sin(loopTime) * .75);
        headTail.position.y = -5 - (Math.cos(loopTime) * .75)

        // force hexagonation of last ring
        headTail.tension(Math.sin(loopTime) * -.1)

        this._edges.forEach((e, i) => {
            const value = 1 / this._edges.length * i;
            const pointValues = this._controllers.map(c => c.getPointAt(e.value));
            e.updatePoints(pointValues)
        })

    }
}