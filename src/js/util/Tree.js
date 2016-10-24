import * as d3 from "d3"


function findRoot(newOrigin, target){
  if(newOrigin){
    if(newOrigin.name === target){
      return newOrigin;
    }
    if(newOrigin.children){
      for (const child of newOrigin.children) {
        console.log("HI!!!", child)
        const result = findRoot(child, target)
        if(result){
          return result;
        }
      }
    }
  }
  return null;
}

let Tree = {}
Tree.create = function(e1, routeFun, data, oRoot, updateRoot){

  const margin = {top: 0, right: 120, bottom: 20, left: 120},
      width = 1200 - margin.right - margin.left,
      height = 780 - margin.top - margin.bottom;
  this.updateRoot = updateRoot
  let i = 0,
      duration = 750,
      root;
  const struct = this;

  const tree = d3.layout.tree()
      .size([height, width]);

  const diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

  const svg = d3.select(e1).append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    oRoot.x0 =  height / 2;
    oRoot.y0 = 0;
    this._root = oRoot;




    const MAX_DEPTH = 3;
    // Truncate down to 3 layers:
    function truncate(d){
      let max = 0,
        myResult = {
          root: d,
          depth: 1,
        };
      if(d.children){
        for (const child of d.children) {
          const result = truncate(child);
          if(result.depth === MAX_DEPTH){
            return result;
          }
          if(result.depth > max){
            max = result.depth;
            myResult = {depth: max+1, root: d};
          }
        }
      }
      return myResult;
    }

    console.log(this._root);
    this.root = findRoot(oRoot, data);
    console.log(findRoot(oRoot, data));
    update(this._root, this);


    console.log(this._root, findRoot(oRoot, data));
    update(this.root, this);
    console.log("THISIS DRAWING");


  d3.select(self.frameElement).style("height", "800px");

  function update(source, element) {

    var nodes = tree.nodes(element.root).reverse(),
        links = tree.links(nodes);

    nodes.forEach(function(d) { d.y = d.depth * 240; });

    const node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    const nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -15 : 15; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6)
        .style("font-family", '"Lato","Helvetica Neue",Helvetica,Arial,sans-serif')
        .on("click", function(d){
          console.log("HI!!!!", d)
          if(d["url"] === 1){
            routeFun(d.name);
          }
        });

    const nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r",10)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    const nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    const link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });

    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  function click(d) {
    //hide
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      //show
      d.children = d._children;
      d._children = null;
    }
    update(d, struct);
    const result = truncate(struct._root);
    struct.root = result.root;

    setTimeout(()=>{update(struct.root, struct)}, 800);
    // console.log("ROOT CLICK",struct.root)
  }
}
Tree.update=function(){
  const newOrigin = this.cleanOther(this._root);
  // console.log("FOOT UPDATE", this.root)
  this.updateRoot(this.root.name, newOrigin);
},
Tree.cleanOther = function(d){
  let resultD = {};
  if(d.children){
    resultD.children = [];
    for (const child of d.children) {
      resultD.children.push(this.cleanOther(child));
    }
  }
  if(d._children){
    resultD._children = [];
    for (const child of d._children) {
      resultD._children.push(this.cleanOther(child));
    }
  }
  if(d.name){
    resultD.name = d.name;
  }
  if(d.url){
    resultD.url = d.url;
  }
  return resultD;
}
Tree.destroy = function(e1){

}
export default Tree
