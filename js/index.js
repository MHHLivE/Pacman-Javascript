let mapFile;

const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (event) => {
        const reader = new FileReader();
        
        reader.onload = () => {
                mapFile = reader.result;
                console.log("map file :: ");
                console.log(mapFile);
                const dfs = new DFS(mapFile);
                dfs.visitNode();

                const bfs = new BFS(mapFile);
                bfs.visitNode();
        }

        reader.readAsText(input.files[0]);
}, false)

// make a pacmap class for parse map array into an array that we can solve it ::
// ? PacMap functions : 1) parseMap() , 2)getValue() , 3)goalReducer() , 4)isGoal() , 5)isWall() , 6)getNeighbors()
class PacMap{
        constructor(map){
                this.map = map;
                this.goalCounter = 0;
                this.startNode = null;
                this.xLength = 0;
                this.yLength = 0;
                this.parseMap();
        }

        toString(){
                let result = [], resultLine = [], resultChar;
                for(let line in this.map){
                        for(let char in this.map[line]){
                                // {{ wall : 3 }, { pacman : 9 }, { goal : 1 }, { empty : 0 }}
                                if(this.map[line][char] === 3) resultChar = "%";
                                else if(this.map[line][char] === 9) {
                                        resultChar = "P";
                                }
                                else if(this.map[line][char] === 1) {
                                        resultChar = ".";
                                }
                                else if(this.map[line][char] === 0) resultChar = " ";

                                resultLine.push(resultChar);
                        }
                        result.push(resultLine.join(""));
                        resultLine = [];
                }
                console.log(result.join("\n"));
        }

        parseMap(){
                let result = [], resultLine = [], resultChar;
                for(let line in this.map){
                        for(let char in this.map[line]){
                                // {{ wall : 3 }, { pacman : 9 }, { goal : 1 }, { empty : 0 }}
                                if(this.map[line][char] === "%") resultChar = 3;
                                else if(this.map[line][char].toUpperCase() === "P") {
                                        resultChar = 9;
                                        if(!this.startNode){
                                                this.startNode = new Node(line, char, null);
                                        } else {
                                                alert("Error :: there are multiple pacman in one map !!!")
                                        }
                                }
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
                this.xLength = this.map.length;
                this.yLength = this.map[0].length;
                
                console.log("map :: ");
                console.log(this.map);
                console.log("goal count :: ");
                console.log(this.goalCounter);
                console.log("x length :: ");
                console.log(this.xLength);
                console.log("y length :: ");
                console.log(this.yLength);
                console.log("START Algorithm : ------------------------------------");
        }

        getXLength(){
                return this.xLength;
        }
        
        getYLength(){
                return this.yLength;
        }

        getValue(location){ 
                return this.map[location.getX()][location.getY()];
        }

        setValue(location, value){
                this.map[location.getX()][location.getY()] = value; 
        }

        goalReducer(){
                if(this.goalCounter === 0) console.log("all goal eated !");
                else {
                        this.goalCounter--;
                        console.log(this.goalCounter + " : goal counter reduced !");        
                }
        }

        getStartNode(){
                return this.startNode;
        }

        getGoalCounter(){
                return this.goalCounter;
        }

        isGoal(location){
                return this.getValue(location) === 1;
        }

        isWall(location){
                return this.getValue(location) === 3;
        }

        getNeighbors(location){
                let neighborsLocation = [];
                if(!this.isWall(new Location(location.getX() - 1, location.getY()))) {
                        neighborsLocation.push(new Location(location.getX() - 1, location.getY()));
                        // console.log(neighborsLocation);
                } 
                // else {
                //         console.log("It's wall UP!");
                // }
                if(!this.isWall(new Location(location.getX(), location.getY() - 1))) {
                        neighborsLocation.push(new Location(location.getX(), location.getY() - 1));
                        // console.log(neighborsLocation);
                } 
                // else {
                //         console.log("It's wall LEFT!");
                // }
                if(!this.isWall(new Location(location.getX() + 1, location.getY()))) {
                        neighborsLocation.push(new Location(location.getX() + 1, location.getY()));
                        // console.log(neighborsLocation);
                } 
                // else {
                        // console.log("It's wall DOWN!");
                // }
                if(!this.isWall(new Location(location.getX(), location.getY() + 1))) {
                        neighborsLocation.push(new Location(location.getX(), location.getY() + 1));
                        // console.log(neighborsLocation);
                } 
                // else {
                //         console.log("It's wall RIGHT!");
                // }

                return neighborsLocation;
        }

        goForward(node){
                if(this.isGoal(node)) this.goalReducer();
                this.setValue(node, 9);

                this.toString();
        }
}


// make a spot class for each spot in map matrix ::
// ? Location functions : 1)getX() , 2)getY() , 3)print() , 4)toString()
class Location{
        constructor(x, y){
                this.x = parseInt(x,  10);
                this.y = parseInt(y,  10);
        }
        
        getX(){
                return parseInt(this.x,  10);
        }
        
        getY(){
                return parseInt(this.y,  10);
        }
        
        print(){
                console.log(this.toString());
        }
        
        toString(){
                return `<${this.getX()}, ${this.getY()}>`;
        }
}

// * extended from Location
// ? Node functions : 1)getParent() , 2)print()_override 3)toString()_override
class Node extends Location{
        constructor(nodeX, nodeY, parentLocation){
                super(nodeX, nodeY);
                if(parentLocation) this.parent = new Location(parentLocation.getX(), parentLocation.getY());
                else this.parent = null;
        }
        
        getParent(){
                return this.parent;
        }
        
        print(){
                console.log(this.toString());
        }
        
        toString(){
                return `<${this.getX()}, ${this.getY()}> from ${this.parent ? this.parent.toString() : 'null' }`;
        }
}

window.onload = () => {}

class SearchingAlgorithm{
        constructor(mapStr){
                const lines = mapStr.split(/\s+/).map(line => {
                        return line.split("")
                });
                this.pacMap = new PacMap(lines);

                this.queue = [this.pacMap.getStartNode()];
                this.visited = [];

        }

        isVisited(location, goalNum){
                const nodeNum = location.getX() * this.pacMap.getYLength() + location.getY();
                if(this.visited[nodeNum] === goalNum) return true;
                else return false;
        }

        visit(location, goalNum){
                const nodeNum = location.getX() * this.pacMap.getYLength() + location.getY();
                this.visited[nodeNum] = goalNum;
        }
        
}

class DFS extends SearchingAlgorithm{
        constructor(mapStr){
                super(mapStr);
        }
        
        visitNode(){
                if(this.pacMap.getGoalCounter() === 0){
                        console.log("DFS :: WON :)");
                } else {
                        if(this.queue.length === 0) console.log("DFS :: LOST :(");
                        else {
                                const current = this.queue.shift();

                                // not visited ! :: 1-visit, 2-update map, 3-update queue 
                                if( !this.isVisited(current, this.pacMap.getGoalCounter())){
                                        this.visit(current, this.pacMap.getGoalCounter());
                                        this.pacMap.goForward(current);
                                        let neighborsLocation = this.pacMap.getNeighbors(current);
                                        neighborsLocation = neighborsLocation.filter((location) => {return (!this.isVisited(location, this.pacMap.getGoalCounter()))})
                                        const newQueue = neighborsLocation.map((location) => {return new Node(location.getX(), location.getY(), current)});
                                        this.queue.map((oldItem) => { newQueue.push(oldItem) });
                                        this.queue = newQueue;
                                        console.log('----------------------------------------------------------------');
                                } 
                                // else {
                                //         console.log('visited !');
                                //         console.log(current);
                                //         const nodeNum = current.getX() * this.pacMap.getYLength() + current.getY();
                                //         console.log('getx : ' + current.getX() + ' | getyLength : ' + this.pacMap.getYLength() + ' | gety : ' + current.getY() + ' | result : ' + nodeNum);
                                //         console.log('visited : ');
                                //         console.log(this.visited);
                                //         console.log('----------------------------------------------------------------');
                                // }
                                this.pacMap.setValue(current, 0);
                                this.visitNode();
                        }
                }
        }
}


class BFS extends SearchingAlgorithm{
        constructor(mapStr){
                super(mapStr);
        }
        
        visitNode(){
                if(this.pacMap.getGoalCounter() === 0){
                        console.log("BFS :: WON :)");
                } else {
                        if(this.queue.length === 0) console.log("BFS :: LOST :(");
                        else {
                                const current = this.queue.shift();
                                if( !this.isVisited(current, this.pacMap.getGoalCounter())){
                                        this.visit(current, this.pacMap.getGoalCounter());
                                        this.pacMap.goForward(current);
                                        let neighborsLocation = this.pacMap.getNeighbors(current);
                                        neighborsLocation = neighborsLocation.filter((location) => {return (!this.isVisited(location, this.pacMap.getGoalCounter()))})
                                        const newQueue = [];
                                        this.queue.map((oldItem) => { newQueue.push(oldItem) });
                                        neighborsLocation.map((location) => {newQueue.push(new Node(location.getX(), location.getY(), current))});
                                        this.queue = newQueue;
                                        console.log('----------------------------------------------------------------');
                                } 
                                // else {
                                //         console.log('visited !');
                                //         console.log(current);
                                //         const nodeNum = current.getX() * this.pacMap.getYLength() + current.getY();
                                //         console.log('getx : ' + current.getX() + ' | getyLength : ' + this.pacMap.getYLength() + ' | gety : ' + current.getY() + ' | result : ' + nodeNum);
                                //         console.log('visited : ');
                                //         console.log(this.visited);
                                //         console.log('----------------------------------------------------------------');
                                // }
                                this.pacMap.setValue(current, 0);
                                this.visitNode();
                        }
                }
        }
}