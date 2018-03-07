/* UNO Componenten library 3.6.0, build date 29-01-2018 */
var CheckboxGroup = (function () {
    function CheckboxGroup(groupList) {
        this.checkboxParents = [];
        this.checkboxChildren = [];
        var checkboxParents = groupList.querySelectorAll('.input__group > .input__control--checkbox');
        var checkboxChildren = document.querySelectorAll('.input__group li > .input__control--checkbox');
        for (var i = 0; i < checkboxParents.length; i++) {
            this.checkboxParents.push({
                element: checkboxParents.item(i),
                listener: this.onGroupCheckboxClick.bind(this)
            });
            this.checkboxParents[i].element.addEventListener('click', this.checkboxParents[i].listener);
        }
        for (var i = 0; i < checkboxChildren.length; i++) {
            this.checkboxChildren.push({
                element: checkboxChildren.item(i),
                listener: this.onChildCheckboxClick.bind(this)
            });
            this.checkboxChildren[i].element.addEventListener('click', this.checkboxChildren[i].listener);
        }
    }
    CheckboxGroup.prototype.onGroupCheckboxClick = function (event) {
        var parent = event.currentTarget.parentNode;
        var ul = parent.querySelector('ul');
        if (ul) {
            var checkboxes = ul.querySelectorAll('.input__control--checkbox');
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes.item(i).checked = event.currentTarget.checked;
            }
        }
    };
    CheckboxGroup.prototype.onChildCheckboxClick = function (event) {
        var li = event.currentTarget.parentNode;
        while (li && !li.classList.contains('input__group')) {
            li = li.parentNode;
        }
        if (li) {
            var ul = li.querySelector('ul');
            var parentCheckbox = li.querySelector('.input__control--checkbox');
            var checkboxesLength = ul.querySelectorAll('.input__control--checkbox').length;
            var checkedCount = ul.querySelectorAll('.input__control--checkbox:checked').length;
            parentCheckbox.checked = checkedCount > 0;
            parentCheckbox.indeterminate = checkedCount > 0 && checkedCount < checkboxesLength;
        }
    };
    CheckboxGroup.prototype.destroy = function () {
        this.checkboxParents.forEach(function (ref) {
            ref.element.removeEventListener('click', ref.listener);
        });
        this.checkboxChildren.forEach(function (ref) {
            ref.element.removeEventListener('click', ref.listener);
        });
    };
    return CheckboxGroup;
})();
exports.CheckboxGroup = CheckboxGroup;
