module.exports = {
    name: 'basis',
    description:'basis roles assigner',
    execute(message, args){
        async function basis() {
            try {
               message.channel.send('Seminar');
               message.react(":a:");
               message.channel.send('AP Euro');
               message.react(":b:");
               message.channel.send('Honors Chem');
               message.react(":regional_indicator_c:");
               message.channel.send('AP Chem');
               message.react(":regional_indicator_d:");
               message.channel.send('Honors Phys');
               message.react(":regional_indicator_e:");
               message.channel.send('AP Phys');
               message.react(":regional_indicator_f:");
               message.channel.send('Honors Bio');
               message.react(":regional_indicator_g:");
               message.channel.send('AP bio');
               message.react(":regional_indicator_h:");
               message.channel.send('AP Lang');
               message.react(":regional_indicator_i:");
               message.channel.send('AP Lit');
               message.react(":regional_indicator_j:");
               message.channel.send('AP calc ab');
               message.react(":regional_indicator_k:");
               message.channel.send('pre calc');
               message.react(":regional_indicator_l:");
               message.channel.send('AP calc bc');
               message.react(":m:");
               message.channel.send('multivariable calc');
               message.react(":regional_indicator_n:");
               message.channel.send('French');
               message.react(":regional_indicator_o:");
               message.channel.send('Spanish');
               message.react(":regional_indicator_p:");
               message.channel.send('latin');
               message.react(":regional_indicator_q:");
               message.channel.send('Mandarin');
               message.react(":regional_indicator_r:");
        } catch(err) {
            // catches errors both in fetch and response.json
            console.log(err);
          }
        }
        basis()
            
    }
}