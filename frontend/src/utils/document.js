export const objectToArray = ( object ) => {
    return Object.values( object )
}

export const generateColor = () => {
    var hexadecimal = '0123456789ABCDEF';
    var hexadecimalLenght = hexadecimal.length
    var color = '#';
  
    for (var index = 0; index < 6; index++ ) {
        color += hexadecimal[Math.floor(Math.random() * hexadecimalLenght)];
    }
    return color;
}