const openai = require('./response.js');

const generate = async (title) => {
    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: 'user',
                content: `I need three different to-do lists, one for monthly goals, one for weekly goals, and one for daily tasks. These to-do lists should be tasks for combating addiction, steps to take to reduce reliance on the addiction including support groups, medication, etc. Instead of joining groups or starting tasks, assume they have already been started, and the tasks should just be how to progress on these undertakings. Avoid things simply for overall health such as exercise, healthy eating, mindfulness, and reflection. First output a one word description of the addiction in the format ADDICTION: and then the addiction. Then start by giving a detailed plan for each three lists, this should be in paragraph format and titled 'YOUR PLAN'. then give three succinct lists (monthly, weekly, daily) with tasks of under 15 words; these should be three bullet point lists each titled daily, weekly, monthly. Exactly four bullet points per list. The overall title should be PLAN CHECKLIST.
                The final format should be as so:
                ADDICTION: {one word addiction}
                
                YOUR PLAN:
                {paragraph long plan}
                
                PLAN CHECKLIST:
                
                Monthly Goals:
                {goal1}
                {goal2}
                {goal3}
                {goal4}
                
                Weekly Goals:
                {goal1}
                {goal2}
                {goal3}
                {goal4}
                
                Daily Goals:
                {goal1}
                {goal2}
                {goal3}
                {goal4}
                
                For context, my addiction story is: ${title}`
            }
        ],
    });
    return description.choices[0].message.content
}

const split = async (title) => {
    const s = await generate(title)
  // do something else here after firstFunction completes
    let lines = s.split('\n');
        let result = {};
        
        for (let idx = 0; idx < lines.length; idx++) {
            // console.log(idx + ': ' + lines[idx]);
        }
    // console.log(lines)
    return lines
}

module.exports = { split }