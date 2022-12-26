const Main = {  //O NOSSO CODIGO ESTARA TODO DENTRO DESTE CONST, POIS ASSIM SERA TD BEM MAIS ORGANIZADO, ESSA NORMALMENTE é A ESTRUTURA DO JS

    tasks: [],
    
    init: function() { // O init é uma propriedade seguida de uma funcao presente em quase todo file JS que ira chamar todas as funcoes aqui dentro
        this.cacheSelectors() //This se referencia ao Main
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },

    cacheSelectors: function() { //Essa funcao sera responsavel por selecionar elementos HTML e armazenar-los em uma variavel
        this.$checkButtons = document.querySelectorAll('.check') //Ao colocar o THIS fazemos com que essa variavel fique disponivel em td MAIN e nao so aqui // O $ é pra saber que é um element HTML
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove') //Aqui colocamos o ALL POIS é MAIS de de um BOTAO DE REMOVE 
    },

    bindEvents: function() { //Sera responsavel por armazenar eventos de click
        const self = this //O THIS dentro do forEach tem um comportamento estranho, portanto devemos definir-lo assim pra que de certo dentro do foreach
        
        this.$checkButtons.forEach(function(button){ //Na criacao da funcao, por ser mais de um BTN precisamos usar um LOOP forEach
            button.onclick = self.Events.checkButton_click //Poderia ter usado o this tb, porem preferiu usar o SELF
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this) //Seria pra fazer a funcao se referenciar ao THIS do bindEvents e nao o da propria funcao

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click
        })
    },

    getStoraged: function() {
        const tasks = localStorage.getItem('tasks')
        this.tasks = JSON.parse(tasks)
    },

    buildTasks: function() {
        let html = ''

        this.tasks.forEach(item => {
            html = html + `
            <li>
             <div class="check"></div>
             <label class="task">
                ${item.task}
             </label>
             <button class="remove"></button>
            </li>
            `
        })

        this.$list.innerHTML = html

        this.cacheSelectors()
        this.bindEvents()
    },

    Events: { //Aqui dentro tera cada funcao de EVENTO... PQ AQUI n tem :function ()??? 

        checkButton_click: function(e) {
            const li = e.target.parentElement // Esse parent ELEMENT é o nosso li class DONE
            const isDone = li.classList.contains('done') //O contains ira selecionar no caso tenha um done no LI

            if (!isDone) { //Aqui estamos falando, que caso tenha essa classe, ao clicar no botaocheck essa funcao ira .remover-la
              return li.classList.add('done')
            } 
            li.classList.remove('done')
            
        },

        inputTask_keypress: function(e){ //IMPORTANTE: Em uma funcao de EVENTO o THIS sempre sera o PROPRIO elemento que vc adicionou o evento min 6 aula>add tarefas
            const key = e.key //O key é um valor que descobrimos ao usar o console.log
            const value = e.target.value //O value é o valor que foi digitado dentro do INPUT

            if(key === 'Enter') {
                    this.$list.innerHTML += `
                    <li class="done">
                    <div class="check"></div>
                    <label class="task">
                        ${value}
                    </label>
                    <button class="remove"></button>
                    </li>
                    `

                    e.target.value = '' //Apos inserir o value o valor sera LIMPADO do input, ira ficar algo mais bonito
                

                this.cacheSelectors()//Ao usar a funcao de KEYPRESS o LEITOR DE CODIGO IRA LER A FUNCAO, Porem os eventos e cache selectors serao perdido, portanto devemos add dnv
                this.bindEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObj = JSON.parse(savedTasks)

                const obj = [
                    {task: value},
                    ...savedTasksObj,
                ]

                localStorage.setItem('tasks', JSON.stringify(obj))

            }
        },

        removeButton_click: function(e){
            let li = e.target.parentElement //Para fazer com que essa funcao funcione devemos selecionar o PAI do REMOVE btn que no caso é a LI

            li.classList.add('removed')

            setTimeout(function(){ //Apos fazer a rotacao dps de 300ms iremos ADD a classe HIDDEN
                li.classList.add('hidden')
            },300)
        }


    }

}

Main.init() //Aqui no final devemos chamar essa funcao que ira chamar todas as outras funcoes