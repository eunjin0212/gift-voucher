<script>
import AppAside from '@/components/AppAside.vue'
import AppMain from '@/components/main/AppMain.vue'
import { ref } from "vue";
import MessageQueueField from "./MessageQueueField.vue";
import { PlusCircleIcon, MinusCircleIcon, TrashIcon, CursorClickIcon, DocumentDuplicateIcon } from '@heroicons/vue/outline'
import moment from 'moment'
import ElementsTooltipSingleton from '@/components/elements/ElementsTooltipSingleton.vue';
import MessageQueueFieldSuggestionPanel from './MessageQueueFieldSuggestionPanel.vue';

// Import JSON files manually
import F_001_MESSAGE_NOTIFICATION_CREATE from './message_templates/001_MESSAGE_NOTIFICATION_CREATE.json';
import F_002_SCHEDULER_EXECUTE from './message_templates/002_SCHEDULER_EXECUTE.json';
import F_003_LEAVE_EXECUTE from './message_templates/003_LEAVE_EXECUTE.json';
import F_004_TIME_REPORT_INIT_EXECUTE from './message_templates/004_TIME_REPORT_INIT_EXECUTE.json';
import F_005_TIME_REPORT_UPDATE_EXECUTE from './message_templates/005_TIME_REPORT_UPDATE_EXECUTE.json';

const _templates = [
	// You are add new message templates
	F_001_MESSAGE_NOTIFICATION_CREATE,
	F_002_SCHEDULER_EXECUTE,
  F_003_LEAVE_EXECUTE,
  F_004_TIME_REPORT_INIT_EXECUTE,
  F_005_TIME_REPORT_UPDATE_EXECUTE,
];

const _queueNames = [
	{ text : '[LOCAL] BatchCommand to Company', value : 'HRIS.local.BATCH_COMMAND_TO_COMPANY_DASHBOARD' },
	{ text : '[STG  ] BatchCommand to Company', value : 'HRIS.stg.BATCH_COMMAND_TO_COMPANY_DASHBOARD' },

	{ text : '[LOCAL] BatchCommand to Employee', value : 'HRIS.local.BATCH_COMMAND_TO_EMPLOYEE_DASHBOARD' },
	{ text : '[STG  ] BatchCommand to Employee', value : 'HRIS.stg.BATCH_COMMAND_TO_EMPLOYEE_DASHBOARD' },

	{ text : '[LOCAL] BatchCommand to Mediator', value : 'HRIS.local.BATCH_COMMAND_TO_MEDIATOR' },
	{ text : '[STG  ] BatchCommand to Mediator', value : 'HRIS.stg.BATCH_COMMAND_TO_MEDIATOR' },

	{ text : '[LOCAL] Commute to Mediator', value : 'HRIS.local.COMMUTE' },
	{ text : '[STG  ] Commute to Mediator', value : 'HRIS.stg.COMMUTE' },

	{ text : '[LOCAL] Commute Daily to Mediator', value : 'HRIS.local.COMMUTE_DAILY' },
	{ text : '[STG  ] Commute Daily to Mediator', value : 'HRIS.stg.COMMUTE_DAILY' },

	{ text : '[LOCAL] FlexBen campaign schedule', value : 'HRIS.local.FLEXBEN_CAMPAIGN_SCHEDULE' },
	{ text : '[STG  ] FlexBen campaign schedule', value : 'HRIS.stg.FLEXBEN_CAMPAIGN_SCHEDULE' },

	{ text : '[LOCAL] Notification to Company', value : 'HRIS.local.NOTIFICATION_TO_COMPANY_DASHBOARD' },
	{ text : '[STG  ] Notification to Company', value : 'HRIS.stg.NOTIFICATION_TO_COMPANY_DASHBOARD' },
	{ text : '[LOCAL] Notification to Employee', value : 'HRIS.local.NOTIFICATION_TO_EMPLOYEE_DASHBOARD' },
	{ text : '[STG  ] Notification to Employee', value : 'HRIS.stg.NOTIFICATION_TO_EMPLOYEE_DASHBOARD' },

  { text : '[LOCAL] Leave grant schedule', value : 'HRIS.local.BATCH_LEAVE_SCHEDULE' },
  { text : '[STG  ] Leave grant schedule', value : 'HRIS.stg.BATCH_LEAVE_SCHEDULE' },

  { text : '[LOCAL] Time Report init schedule', value : 'HRIS.local.BATCH_TIME_REPORT_INIT_SCHEDULE' },
  { text : '[STG  ] Time Report init schedule', value : 'HRIS.stg.BATCH_TIME_REPORT_INIT_SCHEDULE' },

  { text : '[LOCAL] Time Report update schedule', value : 'HRIS.local.BATCH_TIME_REPORT_UPDATE_SCHEDULE' },
  { text : '[STG  ] Time Report update schedule', value : 'HRIS.stg.BATCH_TIME_REPORT_UPDATE_SCHEDULE' },
];

export default {
    components: {
		AppAside, AppMain,
		MessageQueueField,
		PlusCircleIcon, MinusCircleIcon, TrashIcon, CursorClickIcon, DocumentDuplicateIcon,
		ElementsTooltipSingleton,
		MessageQueueFieldSuggestionPanel,
	},
	data(){
		return{
			items : ['Test tools', 'Message queue client'],
			showNotification : false,
			showWarningNotification : false,
			notificationMsg : null,
			notiMessages : {
				success : "Your request is successfully submitted",
				fail : "Sorry, There was a problem with your request, Please try again",
				validation : "Please check the error messages and enter a valid value"
			},
			allMessageTemplates : _templates,
			request : null, // load json file selected in folder : message_templates
			messageTypeChoosed: '',
			messageTypeOptions: [],
			queueNameOptions: _queueNames,
			requestHistory : [],
			suggestionOpenForQueueName : false,
		}
	},
	mounted(){
		const self = this;
		// Load message templates into options
		{
			const mArr = self.allMessageTemplates;
			for( var m=0; m<mArr.length; ++m ){
				self.messageTypeOptions.push({
					value : mArr[m].messageTypeId,
					text : mArr[m].messageTypeId,
				});
			}
		}
		// initial change
		self.$nextTick(()=>{
			self.messageTypeChoosed = self.messageTypeOptions[0].value;
			self.messageTypeChange();
		});

		self.loadHistory();
	},
	methods:{
		// -----------------------------------------------------------------------------
        loadTooltip(ele, msgFn){
            this.__tooltipComponent__hidden__.loadBasic(ele, msgFn);
        },
        loadTooltipElementReady(ele){
            if( ele == null ) return; // auto-reload, so element can be null sometime.
            this.__tooltipComponent__hidden__ = ele;
        },
        // -----------------------------------------------------------------------------
		generateUUID() { // Public Domain/MIT
			var d = new Date().getTime();//Timestamp
			var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16;//random number between 0 and 16
				if(d > 0){//Use timestamp until depleted
					r = (d + r)%16 | 0;
					d = Math.floor(d/16);
				} else {//Use microseconds since page-load if supported
					r = (d2 + r)%16 | 0;
					d2 = Math.floor(d2/16);
				}
				return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
		},
		messageTypeChange(){
            const self = this;
			const k = self.messageTypeChoosed;
			if( ! k ) return;

			const findTmpls = self.allMessageTemplates.filter(d=>d.messageTypeId===k);
			if( findTmpls.length == 0 ) return;

			self.request = findTmpls[0];

			// create UUID to message field.
			for( var i=0; i<self.request.fields.length; ++i ){
				const f = self.request.fields[i];
				f['__field__id__'] = self.generateUUID();
			}
        },
		onDeleteField(fieldIndex){
			this.request.fields = this.request.fields.filter(function(value, index, arr){ 
				return value['__field__id__'] !== fieldIndex;
			});
		},
		onCreateField(f){
			f['__field__id__'] = this.generateUUID();
			this.request.fields.push( f );
		},
		onSendMessageNow(){
			const self = this;
			
			this.insertHistory(this.request);

			const url = self.$api('uri', 'post-testTools-messageClient');

			self.$axios.post(url, self.request )
			.then(res => {
				alert('sent successfully');
			})
			.catch(err => {
				alert('failed to send');
			});
		},
		onExportCurrentMessageTemplate(){
			var win = window.open("#"); 
			win.document.writeln(JSON.stringify(this.request));
		},
		fieldsToString(fields){
			var sum = "";
			for( var f=0; f<fields.length; ++f ){
				sum += (fields[f].name+" : "+fields[f].messageValue+" ");
			}
			return sum;
		},
		insertHistory(req){
			var hists = this.loadFromLocalStorage('__MQ_REQ_HISTORY__');
			req.requestTime = moment().format('LTS');
			req.fieldsSummary = this.fieldsToString(req.fields);
			hists.unshift(req);
			this.saveToLocalStorage('__MQ_REQ_HISTORY__', hists.slice(0,50));
			this.loadHistory();
		},
		onDeleteHistory(index){
			if( ! confirm('Are you sure to delete this history?') ) return;

			const hists = this.loadFromLocalStorage('__MQ_REQ_HISTORY__');
			const newHists = hists.filter((v, idx, arr)=>{
				return idx !== index
			});
			this.saveToLocalStorage('__MQ_REQ_HISTORY__', newHists);
			this.loadHistory();
		},
		onUseHistory(req){
			console.log('history..2', req, this.request);
			this.request = req;
		},
		loadHistory(){
			this.requestHistory = this.loadFromLocalStorage('__MQ_REQ_HISTORY__');
		},
		saveToLocalStorage(k, val){
			window.localStorage.setItem(k, JSON.stringify(val));
		},
		loadFromLocalStorage(k){
			return JSON.parse(window.localStorage.getItem(k) || '[]');
		},
		clickSuggestionForQueueName(){
            this.suggestionOpenForQueueName = true;
        },
		onChooseSuggestForQueueName(v){
			this.request.queueName = v;
		},
	}
}
</script>

<template>
    <div
        id="app"
        class="min-w-[1024px] min-h-[100vh] flex"
    >
		<MessageQueueFieldSuggestionPanel v-model:open="suggestionOpenForQueueName" :list="queueNameOptions" @chooseSuggestItem="onChooseSuggestForQueueName" />
		<ElementsTooltipSingleton :ref="(el)=>{ loadTooltipElementReady(el); }"/>
		<AppAside />
		<AppMain
			:items="items"
		>
			<div class="bg-white shadow sm:rounded-lg mt-10" v-if="request != null">
				<div class="flex flex-row px-4 py-5 sm:px-6">
					<div class="flex-none grow">
						<h3 class="text-lg font-medium leading-6 text-gray-900">
							<input v-model="request.messageTypeId" class="w-full" />
						</h3>
						<p class="mt-1 max-w-2xl text-sm text-gray-500">
							<input v-model="request.messageTypeDesc" class="w-full" />
						</p>
					</div>
					<div class="grow grid justify-items-end flex flex-col gap-4">
						<div class="">
							<ElementsSelectRef
								class=""
								v-model="messageTypeChoosed"
								:full="false"
								:options="messageTypeOptions"
								@click="messageTypeChange"
								:defaultMsg="`Message Type you want to send`"
								/>
						</div>
						<div class="flex flex-row gap-2">
							<input v-model="request.queueName" 
								placeholder="queue address" 
								class="min-w-[600px] text-lg font-medium text-gray-900 p-2 border-2 border-gray-300" />
							<DocumentDuplicateIcon 
								class="h-6 w-6 mt-auto mb-auto cursor-pointer" aria-hidden="true" 
								@click="clickSuggestionForQueueName"/>
						</div>
					</div>
				</div>
				<div class="border-t border-gray-200 px-4 py-5 sm:p-0">
					<dl class="sm:divide-y sm:divide-gray-200">
						<template v-for="(f, index) in request.fields" v-bind:key="index">
							<MessageQueueField 
								v-model:enabled='f.enabled' 
								v-model:name='f.name' 
								v-model:fieldIndex="f.__field__id__"
								v-model:fieldType='f.fieldType' 
								v-model:fieldTypes='f.fieldTypes'
								v-model:messageValue='f.messageValue' 
								v-model:description='f.description'
								:suggestionKeyList="f.suggestionKeyList"
								:suggestionValueList="f.suggestionValueList"
								@deleteField="onDeleteField"
								@createField="onCreateField"
							/>
						</template>
					</dl>
				</div>
			</div>
			<div class="flex flex-row ml-0 mt-2 flex-shrink-0 gap-4">
				<button 
					:ref="(el)=>{ loadTooltip(el, ()=>{
									return 'Send above request for sending message queue';
								})}"
					@click="onSendMessageNow"
					type="button" 
					class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
					Send message
				</button>
				<button 
					:ref="(el)=>{ loadTooltip(el, ()=>{
									return 'Export current request to save new message template.';
								})}"
					@click="onExportCurrentMessageTemplate"
					type="button" 
					class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
					Export request
				</button>
			</div>
			<div class=" bg-white shadow sm:rounded-lg mt-10" v-if="request != null">
				<div class="flex flex-col px-4 py-5 sm:px-6">
					<div class="flex-none">
						<h3 class="text-lg font-medium leading-6 text-gray-900" :ref="(el)=>{ loadTooltip(el, ()=>{
                                return 'Using localStorage key=\'__MQ_REQ_HISTORY__\'';
                            })}">
							History
						</h3>
					</div>
					<hr class="mt-2 mb-2 flex flex-col"/>
					<ul>
						<template v-for="(f, index) in requestHistory" v-bind:key="index">
							<li class="border-b border-gray-200 py-2 grid grid-cols-12 gap-2">
								<span class="border-r border-gray-y-300 truncate col-span-2">{{f.requestTime}}</span>
								<span class="border-r border-gray-y-300 truncate col-span-3">{{f.messageTypeId}}</span>
								<span class="border-r border-gray-y-300 truncate col-span-6">{{f.fieldsSummary}}</span>
								<span class="flex flex-row gap-1 col-span-1">
									<span class="cursor-pointer" @click="onUseHistory(f)" :ref="(el)=>{ loadTooltip(el, ()=>{
											return 'Load this request to current';
										})}">
										<CursorClickIcon class="h-6 w-6" aria-hidden="true"/>
									</span>
									<span class="cursor-pointer" @click="onDeleteHistory(index)">
										<TrashIcon class="h-6 w-6" aria-hidden="true"/>
									</span>
								</span>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</AppMain>
    </div>
</template>