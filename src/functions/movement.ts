export const calculatesPosition = (previous, speed, direction) => {
  let newPosition = { ...previous };
  switch (direction) {
    case 'up':
      newPosition.y -= speed;
      break;
    case 'down':
      newPosition.y += speed;
      break;
    case 'left':
      newPosition.x -= speed;
      break;
    case 'right':
      newPosition.x += speed;
      break;
  }

  return newPosition;
};
