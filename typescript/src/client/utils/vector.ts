export function arrayToVector3(coords: number[]): Vector3 {
  return {
    x: coords[0],
    y: coords[1],
    z: coords[2],
  };
}

export function addVector3(vectorA: Vector3, vectorB: Vector3): Vector3 {
  return {
    x: vectorA.x + vectorB.x,
    y: vectorA.y + vectorB.y,
    z: vectorA.z + vectorB.y,
  };
}

export function subVector3(vectorA: Vector3, vectorB: Vector3): Vector3 {
  return {
    x: vectorA.x - vectorB.x,
    y: vectorA.y - vectorB.y,
    z: vectorA.z - vectorB.y,
  };
}

export function multiplyVector3ByNumber(vectorA: Vector3, value: number): Vector3 {
  return {
    x: vectorA.x * value,
    y: vectorA.y * value,
    z: vectorA.z * value,
  };
}

export function distance(vectorA: Vector3, vectorB: Vector3): number {
  return Math.sqrt(
    Math.pow(vectorA.x - vectorB.x, 2) +
      Math.pow(vectorA.y - vectorB.y, 2) +
      Math.pow(vectorA.z - vectorB.z, 2),
  );
}

export function distance2d(vectorA: Vector3, vectorB: Vector3): number {
  if (vectorA === undefined || vectorB === undefined) {
    throw new Error('distance2d: vectorA or vectorB is undefined');
  }

  return Math.sqrt(Math.pow(vectorA.x - vectorB.x, 2) + Math.pow(vectorA.y - vectorB.y, 2));
}
