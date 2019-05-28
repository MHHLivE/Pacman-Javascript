// make a spot class for each spot in map matrix ::
export class SpotLocation{
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
