var buttonOpen = document.getElementById("buttonOpenDiagram");
var buttonSave = document.getElementById("buttonSaveDiagram");
var buttonPrint = document.getElementById("buttonPrintDiagram");

var toolExtendedFormatting = document.getElementById("toolExtendedFormatting");
var toolInsertBloc = document.getElementById("toolInsertCode__Bloc");
var toolInsertIfElse = document.getElementById("toolInsertCode__IfElse");
var toolInsertSwitch = document.getElementById("toolInsertCode__Switch");
var toolInsertDoWhile = document.getElementById("toolInsertCode__DoWhile");
var toolInsertParagraph = document.getElementById("toolInsertCode__Paragraph");
var toolInsertModule = document.getElementById("toolInsertCode__Module");

var inputAera = document.getElementById("input");
var outputAera = document.getElementById("output");

var parser = new PseudoCodeParser({
    extendedFormatting: true
});

// -----------------------------------------------------------------------------

drawDiagram();

// -----------------------------------------------------------------------------

buttonOpen.addEventListener("click", function (event) {
    event.preventDefault();

    var panel = document.getElementById("welcomePanel");

    buttonOpen.removeEventListener("click", function () {});
    panel.style.display = "none";

    inputAera.focus();
});

buttonSave.addEventListener("click", function (event) {
    event.preventDefault();

    showSavePanel();
});

buttonPrint.addEventListener("click", function (event) {
    event.preventDefault();

    window.print();
});

// -----------------------------------------------------------------------------

toolInsertBloc.addEventListener("click", function (event) {
    event.preventDefault();
    insertCode(inputAera, "---*\n\n------");
    drawDiagram();
});

toolInsertIfElse.addEventListener("click", function (event) {
    event.preventDefault();
    insertCode(inputAera, "if ()\n\nelse\n\nendif");
    drawDiagram();
});

toolInsertSwitch.addEventListener("click", function (event) {
    event.preventDefault();
    insertCode(inputAera, "if ()\n\nelseif ()\n\nelseif ()\n\nelse\n\nendif");
    drawDiagram();
});

toolInsertDoWhile.addEventListener("click", function (event) {
    event.preventDefault();
    insertCode(inputAera, "do while ()\n\nenddo");
    drawDiagram();
});

toolInsertParagraph.addEventListener("click", function (event) {
    event.preventDefault();
    insertCode(inputAera, "paragraphe(MonParagraphe)");
    drawDiagram();
});

toolInsertModule.addEventListener("click", function (event) {
    event.preventDefault();
    insertCode(inputAera, "module(MonModule;;)");
    drawDiagram();
});

toolExtendedFormatting.addEventListener("click", function (event) {
    event.preventDefault();

    if (this.classList.contains("active")) {
        this.classList.remove("active");
        parser.extendedFormatting = false;
    } else {
        this.classList.add("active");
        parser.extendedFormatting = true;
    }

    drawDiagram();
});

// -----------------------------------------------------------------------------

inputAera.addEventListener("keyup", function (event) {
    drawDiagram();
});

inputAera.addEventListener("keypress", function (event) {
    // Ctrl + s
    if (event.ctrlKey && event.key == "s") {
        event.preventDefault();
        showSavePanel();
    } else if (event.key == "Tab") {
        event.preventDefault();

        var cursorPosition = inputAera.selectionStart;
        insertCode(inputAera, "   ");
        inputAera.selectionStart = cursorPosition + 3;
        inputAera.selectionEnd = cursorPosition + 3;
    }
});

// -----------------------------------------------------------------------------

function showSavePanel() {
    var panel = document.getElementById("informationBox__Save");
    var closeButton = document.getElementById("closeInformationBox__Save");

    panel.style.display = "block";

    closeButton.addEventListener("click", function (event) {
        event.preventDefault();

        closeButton.removeEventListener("click", function () {});
        panel.style.display = "none";
    });
}

function drawDiagram() {
    outputAera.innerHTML = parser.drawDiagram(inputAera.value);
}

function insertCode(input, code) {
    var cursorPosition = input.selectionStart;
    var textBefore = input.value.substring(0, cursorPosition);
    var textAfter = input.value.substring(cursorPosition, input.value.length);

    input.value = textBefore + code + textAfter;
}
