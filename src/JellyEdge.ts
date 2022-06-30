import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, Object3D, Points, PointsMaterial, Vector3 } from "three";

export default class JellyEdge extends Object3D {
    private _curve: CatmullRomCurve3;
    private _geometryPoints: Vector3[];
    private _geometry: BufferGeometry;
    private _line: Line;

    private _dotGeometry: BufferGeometry;
    private _point: Points;

    public value: number;

    public edgeStart = 0;
    public edgeEnd = 1;

    public startOffset = new Vector3(0, Math.random() * .4, 0);

    private _firstPoint = new Vector3();



    constructor(edgeValue: number, lineMaterial: LineBasicMaterial, dotMaterial: PointsMaterial) {
        super();

        this.value = edgeValue;

        this._geometry = new BufferGeometry()
        this._dotGeometry = new BufferGeometry();

        this._line = new Line(this._geometry, lineMaterial)
        this.add(this._line)

        this._point = new Points(this._dotGeometry, dotMaterial);
        this.add(this._point);
    }



    public updatePoints(curvePoints: Vector3[]) {
        if (!this._curve) {
            this._curve = new CatmullRomCurve3(curvePoints, false, "catmullrom", .5);
            return
        }

        if (this._curve.points.length != curvePoints.length) {
            this._curve.points = [...curvePoints];
        } else {
            this._curve.points.forEach((p, i) => p.copy(curvePoints[i]))
        }

        this._curve.points[0].add(this.startOffset);
        this._curve.points[1].add(this.startOffset);
        this._curve.points[2].add(this.startOffset);

        this._geometryPoints = this._getPoints(this.edgeStart, this.edgeEnd, 20);
        this._geometry.setFromPoints(this._geometryPoints)
    }

    private _getPoints(start: number, end: number, qtd: number) {
        const arr = new Array<Vector3>(qtd)
        for (let i = 0; i < qtd; i++) {
            const prop = 1 / qtd * i;
            const pos = start + prop * (end - start)
            arr[i] = this._curve.getPoint(pos);
        }

        this._dotGeometry.setFromPoints([arr[0], arr[arr.length - 1]])

        return arr
    }
}