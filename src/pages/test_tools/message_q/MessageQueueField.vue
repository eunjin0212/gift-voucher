<script>
import {
  MinusCircleIcon,
  PlusCircleIcon,
  DocumentDuplicateIcon,
} from "@heroicons/vue/outline";
import ElementsTooltipSingleton from "@/components/elements/ElementsTooltipSingleton.vue";
import MessageQueueFieldSuggestionPanel from "./MessageQueueFieldSuggestionPanel.vue";
import { Switch } from "@headlessui/vue";
import moment from 'moment-timezone'

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function generateRandomNumbers(min, max, places) {
  // If both the minimum and maximum values are integers, return a random integer. Don't let the user specify any decimal places.
  if (Number.isInteger(min) && Number.isInteger(max)) {
    if (places !== undefined) {
      new Error("Cannot specify decimal places with integers.");
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Otherwise, return a random floating point number with specified decimal places.
  else {
    // Make sure the minimum value is a number.
    if (Number.isNaN(Number.parseFloat(min))) {
      new Error("Minimum value is not a number.");
    }

    // Make sure the maximum value is a number.
    if (Number.isNaN(Number.parseFloat(max))) {
      new Error("Maximum value is not a number.");
    }

    // Make sure the decimal places value is a non-negative number greater than 0.
    if (Number.isInteger(places) === false) {
      new Error("Number of decimal places is not a number.");
    }

    if (places <= 0) {
      new Error("Number of decimal places must be at least 1.");
    }

    // Generate the floating point number.
    let value = Math.random() * (max - min + 1) + min;
    return Number.parseFloat(value).toFixed(places);
  }
}

const companySeqList = [
  { text: "Company: Share Treats#12", value: "22062210260231558184" },
];

const employeeSeqList = [
  {
    text: "Employee: Tester in Share Treats#12",
    value: "22062210480198773152",
  },
];

function genSeq20Digits() {
  // SSSSSSSS
  // 00000001
  // 99999999
  const rd = generateRandomNumbers(1, 99999999, 8);
  return moment().tz("Asia/Manila").format("YYMMDDHHmmss") + rd;
}

export default {
  components: {
    MinusCircleIcon,
    PlusCircleIcon,
    DocumentDuplicateIcon,
    ElementsTooltipSingleton,
    MessageQueueFieldSuggestionPanel,
    Switch,
  },
  props: {
    fieldIndex: String,
    enabled: Boolean,
    name: String,
    fieldType: String,
    fieldTypes: Array,
    messageValue: String,
    description: String,
    suggestionKeyList: [String, Array],
    suggestionValueList: [String, Array],
  },
  data() {
    return {
      suggestionOpenForKey: false,
      suggestionOpenForValue: false,
    };
  },
  emits: [
    "update:enabled",
    "update:name",
    "update:fieldType",
    "update:messageValue",
    "update:description",
    "deleteField",
    "createField",
  ],
  methods: {
    // -----------------------------------------------------------------------------
    loadTooltip(ele, msgFn) {
      this.__tooltipComponent__hidden__.loadBasic(ele, msgFn);
    },
    loadTooltipElementReady(ele) {
      if (ele == null) return; // auto-reload, so element can be null sometime.
      this.__tooltipComponent__hidden__ = ele;
    },
    // -----------------------------------------------------------------------------
    clickSuggestionForKey() {
      this.suggestionOpenForKey = true;
    },
    clickSuggestionForValue() {
      this.suggestionOpenForValue = true;
    },
    clickDelete() {
      if (!confirm("Are you sure to delete : " + this.name)) return;
      this.$emit("deleteField", this.fieldIndex);
    },
    clickCreate() {
      const self = this;
      this.$emit("createField", {
        enabled: self.enabled,
        name: self.name,
        fieldType: self.fieldType,
        fieldTypes: self.fieldTypes,
        messageValue: self.messageValue,
        description: self.description,
        suggestionKeyList: self.suggestionKeyList,
        suggestionValueList: self.suggestionValueList,
      });
    },
    onEnabledChange() {
      this.$emit("update:enabled", this.enabled);
    },
    onNameChange() {
      this.$emit("update:name", this.name);
    },
    fieldTypeChange() {
      this.$emit("update:fieldType", this.fieldType);
    },
    onMessageChange() {
      this.$emit("update:messageValue", this.messageValue);
    },
    onDescriptionChange() {
      this.$emit("update:description", this.description);
    },
    makeSuggestionList(suList) {
      if (!suList) return [];

      if (typeof suList === "string") {
        // reserved util feature name.
        return this.suggestionUtilExec(suList);
      }

      if (Array.isArray(suList)) {
        return suList;
      }

      // otherwise
      return [];
    },
    suggestionUtilExec(nameWithparams) {
      // nameWithparams format is "[feature]:[param1]:[param2]..."
      const args = nameWithparams.split(":");
      const feature = args[0];

      if (feature === "UUID") {
        const size = args[1] || 5;
        var out = [];
        for (var i = 0; i < size; ++i) {
          out.push({ text: "UUID" + i, value: generateUUID() });
        }
        return out;
      }

      if (feature === "ISO8601_DATETIME") {
        const start = Number(args[1]) || -2;
        const end = Number(args[2]) || 8;
        var out = [];
        for (var i = start; i <= end; ++i) {
          // 2022-09-14T12:15:46.113+08:00
          const dt = moment()
            .tz("Asia/Manila")
            .add(i, "h")
            .format("YYYY-MM-DDTHH:mm:ssZ");
          out.push({ text: i + " hours", value: dt });
        }
        return out;
      }

      if (feature === "ISO8601_DATETIME_EX") {
        const start = Number(args[1]) || -2;
        const end = Number(args[2]) || 8;
        var out = [];
        for (var i = start; i <= end; ++i) {
          // 2022-09-14T12:15:46.113+08:00
          const dt = moment()
            .tz("Asia/Manila")
            .add(i, "h")
            .minute(0).second(0)
            .format("YYYY-MM-DDTHH:mm:ssZ");
          out.push({ text: i + " hours", value: dt });
        }
        return out;
      }

      if (feature === "COMPANY_SEQ") {
        return companySeqList;
      }

      if (feature === "EMPLOYEE_SEQ") {
        return employeeSeqList;
      }

      if (feature === "GEN_SEQ_20_DIGIT") {
        const size = args[1] || 5;
        var out = [];
        for (var i = 0; i < size; ++i) {
          out.push({ text: "SEQ " + i, value: genSeq20Digits() });
        }
        return out;
      }

      // Default
      return [];
    },
    onChooseSuggestForKey(v) {
      this.$emit("update:name", v);
    },
    onChooseSuggestForValue(v) {
      this.$emit("update:messageValue", v);
    },
  },
  mount() {
    console.log("prop", this.fieldTypes);
  },
};
</script>
<template>
  <div class="p-2 flex flex-row sm:gap-2">
    <MessageQueueFieldSuggestionPanel
      v-model:open="suggestionOpenForKey"
      :list="makeSuggestionList(suggestionKeyList)"
      @chooseSuggestItem="onChooseSuggestForKey"
    />
    <MessageQueueFieldSuggestionPanel
      v-model:open="suggestionOpenForValue"
      :list="makeSuggestionList(suggestionValueList)"
      @chooseSuggestItem="onChooseSuggestForValue"
    />

    <ElementsTooltipSingleton
      :ref="
        (el) => {
          loadTooltipElementReady(el);
        }
      "
    />

    <dt
      class="text-sm font-medium text-gray-500 flex flex-col items-center"
      :ref="
        (el) => {
          loadTooltip(el, () => {
            return 'JAVA: enable property true/false';
          });
        }
      "
    >
      <!-- <Switch v-model="enabled" @change="onEnabledChange" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'mb-auto mt-auto relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
            </Switch> -->
      <input
        type="checkbox"
        class="mb-auto mt-auto w-6 h-6"
        @change="onEnabledChange"
        v-model="enabled"
      />
    </dt>
    <dt
      class="text-sm font-medium text-gray-500"
      :ref="
        (el) => {
          loadTooltip(el, () => {
            return 'JAVA: ClientMessage.putStringProperty([HERE],value...)';
          });
        }
      "
    >
      <ElementsInput
        :full="true"
        :maxlength="199"
        v-model="name"
        placeholder="message key"
        @change="onNameChange"
      />
    </dt>
    <dd
      class="mt-auto mb-auto cursor-grab"
      @click="clickSuggestionForKey"
      :ref="
        (el) => {
          loadTooltip(el, () => {
            return 'Suggestion keys';
          });
        }
      "
    >
      <DocumentDuplicateIcon class="h-6 w-6" aria-hidden="true" />
    </dd>
    <dd
      class="max-w-fit"
      :ref="
        (el) => {
          loadTooltip(el, () => {
            return 'JAVA: ClientMessage.put[String|Long]Property(...)';
          });
        }
      "
    >
      <select name="field-options" v-model="fieldType">
        <option
          v-for="(v, index) in fieldTypes"
          v-bind:key="index"
          :value="v.value"
          @click="fieldTypeChange"
        >
          {{ v.text }}
        </option>
      </select>
    </dd>
    <dd
      class="min-w-[400px]"
      :ref="
        (el) => {
          loadTooltip(el, () => {
            return 'JAVA: ClientMessage.putStringProperty(key..,[VALUE])';
          });
        }
      "
    >
      <ElementsInput
        :full="true"
        :maxlength="199"
        v-model="messageValue"
        placeholder="message value"
        @change="onMessageChange"
      />
    </dd>
    <dd
      class="mt-auto mb-auto cursor-grab"
      @click="clickSuggestionForValue"
      :ref="
        (el) => {
          loadTooltip(el, () => {
            return 'Suggestion values';
          });
        }
      "
    >
      <DocumentDuplicateIcon class="h-6 w-6" aria-hidden="true" />
    </dd>
    <dd
      class="grow"
      :ref="
        (el) => {
          loadTooltip(el, () => {
            return 'For Developer what field means';
          });
        }
      "
    >
      <ElementsInput
        :full="true"
        :maxlength="199"
        v-model="description"
        placeholder="description"
        @change="onDescriptionChange"
      />
    </dd>
    <dd class="mt-auto mb-auto cursor-grab" @click="clickDelete">
      <MinusCircleIcon class="h-6 w-6" aria-hidden="true" />
    </dd>
    <dd class="mt-auto mb-auto cursor-grab" @click="clickCreate">
      <PlusCircleIcon class="h-6 w-6" aria-hidden="true" />
    </dd>
  </div>
</template>
