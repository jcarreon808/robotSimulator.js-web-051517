'use strict';

function Robot() {
  this.coordinates = [0, 0];
  this.bearing = 'north';
}

Robot.prototype.orient = function(direction){
  var directions = ['east', 'west', 'north', 'south'];
  if (directions.includes(direction)){
    this.bearing = direction;
  }else{
    throw new Error('Invalid Robot Bearing');
  }
};


Robot.prototype.turnRight = function(){
  switch(this.bearing){
    case 'north':
      this.orient('east');
      break;
    case 'east':
      this.orient('south');
      break;
    case 'south':
      this.orient('west');
      break;
    case 'west':
      this.orient('north');
      break;
  }
};

Robot.prototype.turnLeft = function(){
  switch(this.bearing){
    case 'north':
      this.orient('west');
      break;
    case 'east':
      this.orient('north');
      break;
    case 'south':
      this.orient('east');
      break;
    case 'west':
      this.orient('south');
      break;
  }
};

Robot.prototype.at = function(x,y){
  this.coordinates[0]=x;
  this.coordinates[1]=y;
};

Robot.prototype.advance = function () {
  switch(this.bearing){
    case 'north':
      this.coordinates[1] += 1;
      break;
    case 'east':
      this.coordinates[0] += 1;
      break;
    case 'south':
      this.coordinates[1] -= 1;
      break;
    case 'west':
      this.coordinates[0] -= 1;
      break;
  }
};

Robot.prototype.instructions = function(directions){
  return directions.split('').map((direction)=>{
    switch(direction){
      case 'R':
        return 'turnRight';
      case 'L':
        return 'turnLeft';
      case 'A':
        return 'advance';
    }
  });
};

Robot.prototype.place = function (args) {
  this.coordinates = [args.x, args.y];
  this.bearing = args.direction;
};

Robot.prototype.evaluate = function (s) {
  this.instructions(s).forEach(function (instruction) {
    this[instruction]();
  }, this);
};
