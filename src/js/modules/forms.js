export default class Form {
    constructor(form) {
        this.forms = document.querySelectorAll(form);
        this.message = {
            loading: "Loading...",
            success: "Thank you! We'll contact you as soon as posible",
            error: "Something went wrong, try again later",
            redir: "Fill the neseccery fields"
        };
        this.path = "assets/question.php";
        this.mask = "+1 (___) ___-____";
        this.verified = false;
    }

    init() {
        this.checkMailInputs();
        this.maskInputs(this.mask);

        this.forms.forEach(form => {
            this.bindPostData(form);
        });
    }

    clearInputs(form) {
        form.querySelectorAll('input').forEach(input => input.value = '');
        form.querySelectorAll('select').forEach(select => select.options[0].selected = true);
    }

    checkMailInputs() {
        document.querySelectorAll('input[name="email"]').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.match(/[^a-z A-Z 0-9 @ \.]/gm)) {
                    input.value = input.value.replace(/[^a-z,^A-Z,^0-9]/gm,'');
                    this.verified = false;
                } else {
                    this.verified = true;
                }
            });
        });
    }

    maskInputs(mask) {
        function setPos(pos, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                const range = elem.createTextRange();

                range.collapse(true);
                range.moveStart('character', pos);
                range.moveEnd('character', pos);
                range.select();
            }
        }

        function createMask(event) {
            const def = mask.replace(/\D/g, "");
            let val = this.value.replace(/\D/g, ""), 
                i = 0;

            if (val.length <= def.length || val[0] !== def[0]) {
                val = def;
            }

            this.value = mask.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
            
            if (event.type === 'blur') {
                if (val.length < 2) {
                    this.value = '';
                } 
            } else {
                setPos(this.value.length, this);
            }
        }

        document.querySelectorAll('[name="phone"]').forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('click', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const message = document.createElement('div');
            message.style.cssText = `
                color: #000;
                font-size: 25px;
                text-align: center;
                font-family: sans-serif; 
                margin-top: 30px;
            `;
            form.append(message);
            
            if (!this.verified) {
                message.textContent = this.message.redir;
                form.querySelector('button').style.backgroundColor = "red";

                setTimeout(() => {
                    form.querySelector('button').style.backgroundColor = "#000";
                    message.remove();
                }, 1500);
                return;
            }

            message.textContent = this.message.loading;

            const formData = new FormData(form); 

            this.postData(this.path, formData)
                .then(res => {
                    console.log(res);
                    message.textContent = this.message.success;
                })
                .catch(e => {
                    console.log(e);
                    message.textContent = this.message.error;
                })
                .finally(() => {
                        this.clearInputs(form);
                        setTimeout(() => {
                            message.remove();
                        }, 1500);
                    }
                );
        });
    } 
}