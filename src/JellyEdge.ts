import { BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, Object3D, Vector3 } from "three";

export default class JellyEdge extends Object3D {
    private curve: Line;

    constructor(lineMaterial: LineBasicMaterial) {
        super()

        this.curve = new Line(this.lineGeometry(), lineMaterial)
        this.add(this.curve)
    }

    private lineGeometry() {
        const curve = new CatmullRomCurve3([
            new Vector3(-10, 0, 10),
            new Vector3(-5, 5, 5),
            new Vector3(0, 0, 0),
            new Vector3(5, -5, 5),
            new Vector3(10, 0, 10)
        ]);

        const points = curve.getPoints(50);
        return new BufferGeometry().setFromPoints(points);
    }
}