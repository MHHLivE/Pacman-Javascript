const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (event) => {
        console.log(input.files);
        const reader = new FileReader();

        reader.onload = () => {
                console.log(reader.result);
                const lines = reader.result.split("\n").map(line => {return line.split("")});
                // console.log(lines);

                const pacMap = new PacMap(lines);
                pacMap.parseMap();
        }

        reader.readAsText(input.files[0]);
}, false)

// make a pacmap class for parse map array into an array that we can solve it ::
class PacMap{
        constructor(map){
                this.map = map;
        }

        parseMap(){
                let result = [], resultLine = [], resultChar;
                for(let line in this.map){
                        for(let char in this.map[line]){
                                
                                // {{ wall : 3 }, { pacman : 9 }, { goal : 1 }, { empty : 0 }}
                                if(this.map[line][char] === "%") resultChar = 3;
                                else if(this.map[line][char].toUpperCase() === "P") resultChar = 9;
                                else if(this.map[line][char] === ".") resultChar = 1;
                                else if(this.map[line][char] === " ") resultChar = 0;

                                resultLine.push(resultChar);
                        }
                        result.push(resultLine);
                        resultLine = [];
                }
                this.map = result;
                console.log(this.map);
        }
}

// make a spot class for each spot in map matrix ::
class SpotLocation{
        constructor(x, y){
                this.x = x;
                this.y = y;
        }

        getX(){
                return this.x;
        }

        getY(){
                return this.y;
        }

        print(){
                console.log(`<${this.getX()}, ${this.getY()}>`);
        }
}

window.onload = () => {
        const point = new SpotLocation(2, 3);
        point.print();
}