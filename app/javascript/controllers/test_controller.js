import {Controller} from "@hotwired/stimulus"

export default class extends Controller {

    static targets = ["name_text_input", "square"];




    greet(event) {
        console.log(`click ${event.params['id']}`);
    }

    get name() {
        return this.squareTarget.attributes['data-square-id'].value;
    }

    patchFigure = (element, dst) => {
        return fetch(`/pieces/${element.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Accept' : 'text/plain'},
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

    dragStart(event) {

        // Вот тут по хорошему бы делать проверку фигуры

        console.log('dragStart');
        (event.target.parentElement.parentElement).style.opacity = "0.4";

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", event.target.id);
        // this.dragSrcEl = event.target;
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", event.target.parentElement.id);


        // event.dataTransfer.setData("text/html", event.target.innerHTML);
    }

    // Над фигурой
    dragEnter(event) {
        console.log('dragEnter');

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

    dragOver(event) {
        console.log('dragOver');
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    }

    dragLeave(event) {
        console.log('dragLeave');
        // (this.closest(event.target, 'td')).classList.remove("over");
        event.target.closest('td').classList.remove("over");
        this.resetOpacity();
    }


    drop(event) {
        console.log('drop');
        console.log(event.target.parentElement)

        event.stopPropagation();


        const data = event.dataTransfer.getData("text");
        const source = document.getElementById(data);
        console.log(source.children[0])
        this.patchFigure(source.children[0], event.target.parentElement)
            .then(()=>{
                event.target.closest('td').classList.remove("over");
                this.resetOpacity();
                event.target.appendChild(source);
                event.target.style.opacity = "1";
            })
    }

    dragEnd(event) {
        this.resetOpacity();
        console.log('dragEnd');
    }



    resetOpacity() {
        this.squareTargets.forEach((el) => {

            (el.getElementsByClassName('buttonTable')[0]).style.opacity = "1";

        });

    }


}

let count = 1;
let k = 1;
(document.querySelectorAll("td")).forEach((item) => {
    if(item.querySelector('span')) {
        item.querySelector('span').id = 'figure-' + count;
        count += 1;
    };
    item.id = 'td-' + k;
    k += 1;
})

