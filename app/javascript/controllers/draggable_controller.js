import {Controller} from "@hotwired/stimulus"

// Connects to data-controller="draggable"
export default class extends Controller {

    static targets = ["name_text_input", "square"];

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

// Курсор покинул область
    dragLeave(event) {
        // console.log('dragLeave');
        // (this.closest(event.target, 'td')).classList.remove("over");
        event.target.closest('td').classList.remove("over");
        this.resetOpacity();
    }

    resetOpacity() {
        this.squareTargets.forEach((el) => {

            (el.getElementsByClassName('buttonTable')[0]).style.opacity = "1";

        });

    }
}
