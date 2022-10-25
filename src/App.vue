<template>
    <div class="app" id="app">
        <section class="container">
            <div :class="$style.window" class="window">
                <header :class="$style.header" class="title-bar">
                    <h1 class="title">Our users</h1>
                </header>
                <div :class="$style.wrapper">
                    <div :class="$style.employees">
                        <button :class="$style.btn"
                                class="btn"
                                type="button"
                                @click="handleShowFormBtnClick"
                        >
                            {{ isEmployeeFormShown ? 'hide form' : 'add user' }}
                        </button>
                        <EmployeeTable :class="$style.table"
                                       :employees="employees"
                                       @sort-employees="handleSortEmployees"
                        />
                    </div>
                    <transition name="fade">
                        <FormAddEmployee v-if="isEmployeeFormShown"
                                         :class="$style.form"
                                         :chief-list="chiefList"
                                         @save-employee="handleSaveEmployee"
                        />
                    </transition>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {loadEmployers, updateEmployers} from './api';

import EmployeeTable from './components/EmployeeTable'
import FormAddEmployee from './components/FormAddEmployee';

export default {
    name: 'App',

    components: {
        EmployeeTable,
        FormAddEmployee
    },

    data() {
        return {
            isEmployeeFormShown: false,

            employees: [],
        };
    },

    created() {
        this.employees = loadEmployers();
    },

    computed: {
        chiefList() {
            let chiefs = [];
            this.extractEmployees(this.employees, chiefs);
            return chiefs;
        }
    },

    methods: {
        handleShowFormBtnClick() {
            this.toggleForm();
        },

        toggleForm() {
            this.isEmployeeFormShown = !this.isEmployeeFormShown;
        },

        extractEmployees(employees, insertionPlace) {
            employees.forEach(el => {
                insertionPlace.push(el);
                if (el.subordinates && el.subordinates.length) {
                    this.extractEmployees(el.subordinates, insertionPlace)
                }
            });
        },

        handleSaveEmployee(employee, chief) {
            const employeeCard = this.createEmployeeCard(employee, chief);
            if (chief && chief.subordinates) {
                chief.subordinates.push(employeeCard);
            }
            if (chief && !chief.subordinates) {
                chief.subordinates = [employeeCard];
            }
            if (!chief) {
                this.employees.push(employeeCard);
            }

            updateEmployers(this.employees);

            this.employees = loadEmployers();
        },

        createEmployeeCard(rawEmployee, chief) {
            const id = this.generateNewEmployeeId(chief);
            const card = {
                id: id,
                name: rawEmployee.name,
                tel: rawEmployee.tel,
            }
            return card;
        },

        generateNewEmployeeId(EmployeeChief) {
            let id = String(this.employees.length + 1);
            if (EmployeeChief && EmployeeChief.subordinates) {
                id = EmployeeChief.id + String(EmployeeChief.subordinates.length + 1);
            }
            if (EmployeeChief && !EmployeeChief.subordinates) {
                id = EmployeeChief.id + '1';
            }
            return id;
        },

        handleSortEmployees() {
            this.sortEmployees(this.employees);

            updateEmployers(this.employees);
            this.employees = loadEmployers();
        },

        sortEmployees(employees) {
            employees.sort((a, b) => a.name.localeCompare(b.name));
            employees.forEach(el => {
                if (el.subordinates && el.subordinates.length) {
                    this.sortEmployees(el.subordinates);
                }
            });
        }
    }
}

</script>

<style lang="scss" module>
    .table {
        width: 100%;
    }

    .window {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-top: 0;
        margin-right: 0;
        margin-left: 0;
    }

    .header {
        margin-bottom: 2rem;
    }

    .wrapper {
        display: grid;
        grid-template-columns: minmax(700px, 1fr) 1fr;
        grid-gap: 2em;
        padding: 0 1rem 1rem;

        @media only screen and (max-width: 1280px) {
            grid-template-columns: 1fr;
        }
    }

    .btn {
        margin-bottom: 1rem;
    }

    .form {
        align-self: flex-start;
    }
</style>
