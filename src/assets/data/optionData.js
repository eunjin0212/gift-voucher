const employeeType =  [
    // full time 지운 데이터 / 만약 full time 이 있는 데이터를 원하시면 contractType 이용 부탁합니다 
        {"text": "Part-time employees", "value" : "PART_TIME" },
        {"text": "Fixed term and contract employees", "value" : "FIXED_TERM_CONTRACT" },
        {"text": "probation", "value" : "PROBATION"},
        {"text": "Commission and piece rate employees", "value" : "COMMISSION_AND_PIECE_RATE" },
        {"text": "Migrant and overseas workers", "value" : "MIGRANT_AND_OVERSEAS" },
        {"text": "ETC", "value" : "ETC" }
    ]

const status = [
        {"text" : "Active" , "value" : "ACTIVE" }, 
        {"text" : "On Leave", "value" : "ON_LEAVE" }, 
        {"text" : "Resigned", "value" : "RESIGNED" }
    ]

const gender = [
        {
            "text": "Male",
            "value": "M"
        },
        {
            "text": "Female",
            "value": "F"
        },
        {
            "text": "Other",
            "value": "O"
        }
    ]
const maritalStatus =[
        {
            "text" : "married",
            "value" : "M"
        },
        {
            "text" : "single", 
            "value" : "S"
        }
    ]

 const graduationCategory =[
        {
            "text" : "Attending",
            "value" : "Attending"
        },
        {
            "text" : "leave of absence", 
            "value" : "leave of absence"
        },
         {
            "text" : "withdrawal from the school",
            "value" : "withdrawal from the school"
        },
        {
            "text" : "weeding", 
            "value" : "weeding"
        },
         {
            "text" : "drop out",
            "value" : "drop out"
        },
        {
            "text" : "Graduated", 
            "value" : "Graduated"
        },
        {
            "text" : "early graduation", 
            "value" : "early graduation"
        }
        
 ]
    
 const contractType =[
        {"text": "Full-time employees", "value" : "FULL_TIME" },
        {"text": "Part-time employees", "value" : "PART_TIME" },
        {"text": "Fixed term and contract employees", "value" : "FIXED_TERM_CONTRACT" },
        {"text": "probation", "value" : "PROBATION"},
        {"text": "Commission and piece rate employees", "value" : "COMMISSION_AND_PIECE_RATE" },
        {"text": "Migrant and overseas workers", "value" : "MIGRANT_AND_OVERSEAS" },
        {"text": "ETC", "value" : "ETC" }
    ]
   
export {
    employeeType,
    status,
    gender,
    maritalStatus,
    graduationCategory,
    contractType
}
