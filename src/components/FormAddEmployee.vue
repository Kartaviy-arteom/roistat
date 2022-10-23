<template>
    <div class="modal-dialog outer-border" :class="$style.FormAddEmployee">
        <form :class="$style.form"
              autocomplete="off"
              @submit.prevent="handleFormSubmit"
        >
            <fieldset :class="$style.wrapper">
                <div :class="$style.title" class="title-bar">
                    <h2 class="title">Add new user</h2>
                </div>
                <div :class="$style.row">
                    <label :class="$style.label" for="name">name</label>
                    <input :class="$style.field"
                           type="text"
                           name="user-name"
                           id="name"
                           placeholder="user name"
                           required
                           v-model="name"
                    >
                </div>
                <div :class="$style.row">
                    <label :class="$style.label" for="tel">tel number</label>
                    <input :class="$style.field"
                           type="text"
                           name="user-name"
                           id="tel"
                           placeholder="user tel number"
                           minlength="11"
                           maxlength="11"
                           required
                           v-model="tel"
                    >
                </div>
                <div :class="$style.row">
                    <label :class="$style.label" for="select">Chief</label>
                    <select id="select"
                            :class="$style.field"
                            v-model="select"
                    >
                        <option value="no-chief"></option>
                        <option v-for="chief in chiefList"
                                :key="chief.id"
                                :value="chief.id"
                        >
                            {{ chief.name }}
                        </option>
                    </select>
                </div>
            </fieldset>
            <button class="btn"
                    type="submit"
            >
                {{ submitBtnText }}
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'FormAddEmployee',

    data() {
        return {
            name: '',
            tel: '',
            select: 'no-chief',

            submitBtnText: 'save'
        };
    },

    props: {
        chiefList: {
            type: [],
            default: () => [],
        },
    },

    methods: {
        handleFormSubmit() {
            this.$emit('save-employee', { name: this.name, tel: this.tel }, this.chiefList.find(el => el.id === this.select));
            this.resetForm();
            this.toggleBtnText();
        },

        resetForm() {
            this.name = '';
            this.tel = '';
            this.select = 'no-chief';
        },

        toggleBtnText() {
            this.submitBtnText = 'saved';
            setTimeout(() => this.submitBtnText = 'save', 1000);
        }
    }
};
</script>

<style lang="scss" module>
    .FormAddEmployee {
        //
    }

    .form {
        padding: 1rem;
    }

    .wrapper {
        margin-bottom: 1rem;
    }

    .title {
        margin-bottom: 1rem;
    }

    .row {
        display: flex;
        margin-bottom: 1rem;

        &:last-child {
            margin-bottom: 0;
        }

        @media only screen and (max-width: 768px) {
            flex-direction: column;
        }
    }

    .label {
        flex-shrink: 0;
        width: 12rem;
        margin-right: 1rem;

        @media only screen and (max-width: 768px) {
            width: 100%;
            margin-bottom: .5rem;
        }
    }

    .field {
        flex-grow: 1;

        @media only screen and (max-width: 768px) {
            width: 100%;
        }
    }
</style>
