export function calculateFare(
  distance: number
) {
  if (distance <= 25) {
    return 3000;
  }

  const extraDistance =
    distance - 25;

  const extraBlocks = Math.ceil(
    extraDistance / 10
  );

  return (
    3000 +
    extraBlocks * 1000
  );
}