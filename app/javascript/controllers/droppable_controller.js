import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="droppable"
export default class extends Controller {


    static targets = ["name_text_input", "square"];

    patchFigure = (figure_id, dst) => {
        return fetch(`/pieces/${figure_id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'text/plain'},
            body: JSON.stringify({
                piece: {
                    x_coord: dst.getAttribute('data-x-coord'),
                    y_coord: dst.getAttribute('data-y-coord')
                }
            })
        })
    }


    closest(el, selector) {
        if (Element.prototype.closest) {
            return el.closest(selector);
        }

        let parent = el;

        while (parent) {
            if (parent.matches(selector)) {
                return parent;
            }

            parent = parent.parentElement;
        }

        return null;
    }

    // Курсор навелся на область
    dragEnter(event) {

        // console.log('dragEnter');

        // if(event.target.tagName == 'td') {
        //     console.log(event.target);
        // }
        // (this.closest(event.target, 'td')).classList.add("over");
        event.target.closest('td').classList.add("over");
        // event.target.classList.add("over");
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    }

    // Над фигурой
    dragOver(event) {

        if (event.preventDefault) {
            // console.log(event.target);
            event.preventDefault();
        }
        return false;
    }

// Курсор покинул область
    dragLeave(event) {
        // console.log('dragLeave');
        // (this.closest(event.target, 'td')).classList.remove("over");
        event.target.closest('td').classList.remove("over");
        this.resetOpacity();
    }


    drop(event) {

        event.stopPropagation();
        console.log('square-destination');
        let target;
        if (event.target.hasAttribute('data-x-coord')) {
            console.log('drop to square');
            target = event.target;
            console.log(target);
        } else {
            console.log('drop to not square');
            target = event.target.parentElement.parentElement;
            console.log(target);
        }
        const id_figure_source = event.dataTransfer.getData("text");
        const figure = document.getElementById(id_figure_source);

        console.log('id-figure-source');
        console.log(id_figure_source); //фигура которую перемещаем


        this.patchFigure(id_figure_source, target)
            .then(() => {
                event.target.closest('td').classList.remove("over");
                this.resetOpacity();
                event.target.appendChild(figure);
                event.target.style.opacity = "1";
            })
    }


    resetOpacity() {
        this.squareTargets.forEach((el) => {

            (el.getElementsByClassName('buttonTable')[0]).style.opacity = "1";

        });

    }
}
