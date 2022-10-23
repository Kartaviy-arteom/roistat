<template>
    <div :class="$style.EmployeeTableRow">
        <div class="standard-dialog" :class="$style.cell">
            <span v-if="employee.subordinates && employee.subordinates.length || isSub">+ </span>
            {{ employee.name }}
        </div>
        <div class="standard-dialog" :class="$style.cell">{{ normalizedTelNumber }}</div>
        <template v-if="employee.subordinates && employee.subordinates.length">
            <EmployeeTableRow v-for="employee in employee.subordinates"
                              :employee="employee"
                              :key="employee.id"
                              :class="$style.subordinates"
                              isSub
            />
        </template>
    </div>
</template>

<script>
import { prettyPhone } from '../assets/js/utils';

export default {
    name: 'EmployeeTableRow',

    props: {
        employee: {
            type: Object,
            default: () => ({}),
        },

        isSub: {
            type: Boolean,
            default: false,
        }
    },

    computed: {
        normalizedTelNumber() {
            return prettyPhone(this.employee.tel);
        }
    }
}
</script>

<style lang="scss" module>
    .EmployeeTableRow {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
    }

    .cell {
        flex: 1 0 50%;
        max-width: calc(100% - 200px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:nth-child(2) {
            width: 200px;
            max-width: 200px;
        }

        @media only screen and (max-width: 768px) {
            max-width: calc(100% - 150px);

            &:nth-child(2) {
                width: 150px;
                max-width: 150px;
            }
        }
    }

    .subordinates {
        width: calc(100% - 2em);
        min-width: 300px;
        margin-left: auto;

        @media only screen and (max-width: 768px) {
            width: calc(100% - .5em);
            min-width: 200px;
        }
    }
</style>
