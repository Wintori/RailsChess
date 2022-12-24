import {Controller} from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["name_text_input", "square"]

    greet(event) {
        console.log(`click ${event.params['id']}`)
    }

    get name() {
        return this.squareTarget.attributes['data-square-id'].value
    }


    dragStart(event) {
        console.log('dragStart')
        event.target.style.opacity = "0.4";
        // this.dragSrcEl = event.target;


        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.clearData();
        event.dataTransfer.setData("text/plain", event.target.id);
        // event.dataTransfer.setData("text/html", event.target.innerHTML);
    }

    dragEnter(event) {
        console.log('dragEnter')
        event.target.classList.add("over");
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    }

    dragOver(event) {
        console.log('dragOver')
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    }

    dragLeave(event) {
        console.log('dragLeave')
        event.target.classList.remove("over");
        this.resetOpacity();
    }


    drop(event) {
        console.log('drop')
        event.stopPropagation();

        event.target.classList.remove("over");
        this.resetOpacity();
        const data = event.dataTransfer.getData("text");
        const source = document.getElementById(data);
        event.target.appendChild(source);

    }

    dragEnd(event) {
        this.resetOpacity();
        console.log('dragEnd')
    }

    resetOpacity() {
        this.squareTargets.forEach((el) => {
            el.style.opacity = "1";
        });
    }
}
