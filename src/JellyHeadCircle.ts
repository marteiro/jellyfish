import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, LineSegments, Object3D, Vector3 } from "three";

export default class JellyHeadCircle extends Object3D {
    private _NCurvePoints = 4;
    private _NGeometryPoints = 50;
    private _BaseTension = .8;

    private _radius: number = 1;

    private _curve: CatmullRomCurve3;
    private _curvePoins = [...new Array(this._NCurvePoints)].map(_ => new Vector3(0, 0, 0));
    private _curveGeometry = new BufferGeometry()

    constructor(radius: number, y: number, controlletMaterial: LineBasicMaterial) {
        super();

        this._curve = new CatmullRomCurve3(this._curvePoins, true, "catmullrom", this._BaseTension);

        this.position.y = y;

        this.radius = radius;

        const line = new Line(this._curveGeometry, controlletMaterial);
        this.add(line)
    }

    set radius(value: number) {
        this._radius = value;

        const targetVec = new Vector3();
        const targetAxis = new Vector3(0, 1, 0);
        this._curvePoins.forEach((v, i) => {
            targetVec.set(0, 0, value);
            targetVec.applyAxisAngle(targetAxis, Math.PI * 2 / this._curvePoins.length * i);
            v.copy(targetVec)
        })

        let geometryPoints = this._curve.getPoints(this._NGeometryPoints);
        const m = this._curveGeometry.setFromPoints(geometryPoints);
    }

    get radius() {
        return this._radius;
    }

    getPointAt(position: number) {
        this._curve.getPoint(position);
    }

    // offsetTension() {
    //     this._curve.tension = .8;
    // }
}