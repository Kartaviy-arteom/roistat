<template>
    <div :class="$style.EmployeeTable">
        <div :class="$style.row">
            <div class="standard-dialog" :class="$style.cell">
                <button :class="$style.sortBtn"
                        type="button"
                        aria-label="sort subordinates employees"
                        :disabled="!employees || !employees.length"
                        @click="handleSortBtnClick"
                >
                    Name
                </button>
            </div>
            <div class="standard-dialog" :class="$style.cell">Tel. number</div>
        </div>
        <EmployeeTableRow v-for="employee in employees"
                          :employee="employee"
                          :key="employee.id"
        />
    </div>
</template>

<script>
import EmployeeTableRow from './EmployeeTableRow';

export default {
    name: 'EmployeeTable',

    components: {
        EmployeeTableRow,
    },

    props: {
        employees : {
            type: Array,
            default: () => [],
        },
    },

    methods: {
        handleSortBtnClick() {
            this.$emit('sort-employees');
        },
    }
}
</script>

<style lang="scss" module>
  .EmployeeTable {
    //
  }

  .row {
      box-sizing: border-box;
      display: flex;
  }

  .cell {
      flex: 1 0 50%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 700;

      &:last-child {
          max-width: 200px;
      }

      @media only screen and (max-width: 768px) {
          &:last-child {
              max-width: 150px;
          }
      }
  }

  .sortBtn {
      width: 100%;
      height: 100%;
      padding: 0;
      appearance: none;
      font: inherit;
      text-align: left;
      border: none;
      background: none;
      cursor: pointer;
  }
</style>
