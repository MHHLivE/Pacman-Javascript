const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (event) => {
        console.log(input.files);
        const reader = new FileReader();

        reader.onload = () => {
                console.log(reader.result);
                const lines = reader.result.split("\n").map(line => {return line.split("")});
                // console.log(lines);

                const pacMap = new PacMap(lines);
                const test = new Location(3, 4);
                pacMap.parseMap();
                test.print();
                console.log(pacMap.getValue(test));
                const testNeighbors = pacMap.getNeighbors(test);
                console.log(testNeighbors);
                
        }

        reader.readAsText(input.files[0]);
}, false)

// make a pacmap class for parse map array into an array that we can solve it ::
class PacMap{
        constructor(map){
                this.map = map;
                this.goalCounter = 0;
        }

        parseMap(){
                let result = [], resultLine = [], resultChar;
                for(let line in this.map){
                        for(let char in this.map[line]){
                                
                                // {{ wall : 3 }, { pacman : 9 }, { goal : 1 }, { empty : 0 }}
                                if(this.map[line][char] === "%") resultChar = 3;
                                else if(this.map[line][char].toUpperCase() === "P") resultChar = 9;
                                else if(this.map[line][char] === ".") {
                                        resultChar = 1;
                                        this.goalCounter++;
                                }
                                else if(this.map[line][char] === " ") resultChar = 0;

                                resultLine.push(resultChar);
                        }
                        result.push(resultLine);
                        resultLine = [];
                }
                this.map = result;
                console.log(this.map);
        }

        getValue(location){ 
                return this.map[location.getX()][location.getY()];
        }

        goalReducer(){
                this.goalCounter--;
                console.log(this.goalCounter + " : goal counter reduced !");
                if(goalCounter === 0) console.log("all goal eated !");
        }

        // getValue(x, y){
        //         return this.map[x][y];
        // }

        isGoal(location){
                return this.getValue(location) === 1;
        }
        
        // isGoal(x, y){
        //         return this.getValue(x, y) === 1;
        // }

        isWall(location){
                return this.getValue(location) === 3;
        }
        
        // isWall(x, y){
        //         const temp = new Location(x, y)
        //         return this.getValue(temp) === 3;
        // }

        getNeighbors(location){
                let neighborsLocation = [];
                if(!this.isWall(new Location(location.getX() - 1, location.getY()))) {
                        neighborsLocation.push(new Location(location.getX() - 1, location.getY()));
                        console.log(neighborsLocation);
                } else {
                        console.log("It's wall UP!");
                }
                if(!this.isWall(new Location(location.getX(), location.getY() - 1))) {
                        neighborsLocation.push(new Location(location.getX(), location.getY() - 1));
                        console.log(neighborsLocation);
                } else {
                        console.log("It's wall LEFT!");
                }
                if(!this.isWall(new Location(location.getX() + 1, location.getY()))) {
                        neighborsLocation.push(new Location(location.getX() + 1, location.getY()));
                        console.log(neighborsLocation);
                } else {
                        console.log("It's wall DOWN!");
                }
                if(!this.isWall(new Location(location.getX(), location.getY() + 1))) {
                        neighborsLocation.push(new Location(location.getX(), location.getY() + 1));
                        console.log(neighborsLocation);
                } else {
                        console.log("It's wall RIGHT!");
                }

                for(var neighbor in neighborsLocation){
                        console.log(neighborsLocation[neighbor].toString());
                }
                return neighborsLocation;
        }
}

class DFS{
        constructor(map, startX, startY){
                this.start = new Node(startX, startY, null);
                this.map = map;
        }

        
}

// make a spot class for each spot in map matrix ::
class Location{
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
                console.log(this.toString());
        }

        toString(){
                return `<${this.getX()}, ${this.getY()}>`;
        }
}

class Node extends Location{
        constructor(startX, startY, parentLocation){
                super(startX, startY);
                this.parent = new Location(parentLocation.getX(), parentLocation.getY());
        }

        getParent(){
                return this.parent;
        }

        print(){
                console.log(this.toString());
        }

        toString(){
                return `<${this.getX()}, ${this.getY()}> from ${this.parent.toString()}`;
        }
}

window.onload = () => {
        const point = new Location(1, 2);
        const childPoint = new Node(2, 1, point);
        // const test = [['%', '%', '%', '%'],['%', ' ', 'P', '%'], ['%', '.', ' ', '%'], ['%', '%', '%', '%']];

        // const testMap = new PacMap(test);
        // testMap.parseMap();
        // testMap.getNeighbors(point);
        // testMap.isGoal(childPoint.getX(), childPoint.getY());

        // point.print();
        // childPoint.print();
}