import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import uuid from 'uuid/v1';
import {getTypeColor} from '../utils/getTypeColor';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';
import '../styles/pokemons-evolution-tree.scss';


class PokemonsEvolutionTree extends PureComponent {
    static propTypes = {
        evolutionChain: PropTypes.object.isRequired,
    };

    id = 'pokemonsEvolutionTree' + uuid();

    componentDidMount() {
        const treeData = this.props.evolutionChain.chain;

        // Set the dimensions and margins of the diagram
        const margin = {top: 20, right: 90, bottom: 30, left: 90};
        const width = 1000 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        const svg = d3.select('#' + this.id)
            .append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let i = 0;
        const duration = 750;
        const iconSize = 96;

        // declares a tree layout and assigns the size
        const treeMap = d3.tree().size([height, width]);

        // Assigns parent, children, height, depth
        const root = d3.hierarchy(treeData, (d) => d.evolves_to);
        root.x0 = height / 2;
        root.y0 = 0;

        update(root);

        function update(source) {
            // Assigns the x and y position for the nodes
            const treeData = treeMap(root);

            // Compute the new tree layout.
            const nodes = treeData.descendants();
            const links = treeData.descendants().slice(1);

            // Normalize for fixed-depth.
            nodes.forEach((d) => d.y = d.depth * 180);

            // ****************** Nodes section ***************************

            // Update the nodes
            const node = svg.selectAll('g.node')
                .data(nodes, (d) => d.id || (d.id = ++i));

            // Enter any new modes at the parent's previous position.
            const nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr('transform', () => "translate(" + source.y0 + "," + source.x0 + ")")
                .on('click', click);

            addPokemonIcons(nodeEnter);

            addPokemonIds(nodeEnter);

            addPokemonNames(nodeEnter);

            addPokemonTypes(nodeEnter);

            addPokemonEvolutionDetails(nodeEnter);

            // UPDATE
            const nodeUpdate = nodeEnter.merge(node);

            transitionToProperPosition(nodeUpdate);

            removeAnyExitingNodes(node, source);


            // ****************** links section ***************************

            // Update the links...
            const link = svg.selectAll('path.link')
                .data(links, d => d.id);

            // Enter any new links at the parent's previous position.
            const linkEnter = link.enter().insert('path', "g")
                .attr("class", "link")
                .attr('d', function () {
                    const o = {x: source.x0, y: source.y0};
                    return diagonal(o, o)
                });

            // UPDATE
            const linkUpdate = linkEnter.merge(link);

            // Transition back to the parent element position
            linkUpdate.transition()
                .duration(duration)
                .attr('d', (d) => diagonal(d, d.parent));

            // Remove any exiting links
            link.exit().transition()
                .duration(duration)
                .attr('d', function () {
                    const o = {x: source.x, y: source.y};
                    return diagonal(o, o)
                })
                .remove();

            // Store the old positions for transition.
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        function addPokemonIcons(nodeEnter) {
            nodeEnter.append("svg:image")
                .attr('x', -40)
                .attr('y', -50)
                .attr('width', iconSize)
                .attr('height', iconSize)
                .attr("xlink:href", d => d.data.info.sprites.front_default);
        }

        function addPokemonIds(nodeEnter) {
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("y", 50)
                .style('fill', 'gray')
                .text(d => '#' + d.data.info.id);
        }

        function addPokemonNames(nodeEnter) {
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", -20)
                .attr("y", 75)
                .attr("font-weight", 'bold')
                .style('fill', 'blue')
                .text(d => capitalizeFirstLetter(d.data.species.name));
        }

        function addPokemonTypes(nodeEnter) {
            if (nodeEnter.size()) {
                // Add pokemon types
                nodeEnter.datum().data.info.types.forEach((type, index) => {
                    const typeName = type.type.name;

                    nodeEnter
                        .append('text')
                        .attr("dy", ".35em")
                        .attr("x", -20)
                        .attr("y", 100 + (25 * index))
                        .style('fill', () => getTypeColor(typeName))
                        .text(() => capitalizeFirstLetter(typeName));
                });
            }
        }

        function addPokemonEvolutionDetails(nodeEnter) {
            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", -125)
                .attr("y", -10)
                .attr("font-weight", 'bold')
                .style('fill', 'blue')
                .text(d => d.data.evolution_details.map((ed) => ed.trigger.name).join());
        }

        function transitionToProperPosition(nodeUpdate) {
            nodeUpdate.transition()
                .duration(duration)
                .attr("transform", (d) => "translate(" + d.y + "," + d.x + ")");
        }

        function removeAnyExitingNodes(node, source) {
            node.exit().transition()
                .duration(duration)
                .attr("transform", () => "translate(" + source.y + "," + source.x + ")")
                .remove();
        }

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {
            return `M ${s.y} ${s.x}
                        C ${(s.y + d.y) / 2} ${s.x},
                          ${(s.y + d.y) / 2} ${d.x},
                          ${d.y} ${d.x}`;
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }

    render() {
        return (
            <div id={this.id}/>
        );
    }
}

PokemonsEvolutionTree.propTypes = {
    evolutionChain: PropTypes.object.isRequired,
};

export default PokemonsEvolutionTree;
