// noinspection DuplicatedCode

import {defineComponent} from "vue";

let username = "";
let pageable = {
    page: 0,
    size: 10
};

function queryUserList(param, {page, size}) {
    const timestamp = "?timestamp=" + new Date().getTime();
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/sys/user/queryuserlist" + timestamp + "&page=" + page + "&size=" + size,
            method: "POST",
            data: param
        }).then((data) => {
            if (data && data.success) {
                resolve(data.body);
            } else {
                reject(data);
            }
        });
    }).catch(err => {
        window.alert(err["message"] + ": " + err["body"] + "");
    });
}

function initData() {
    queryUserList.bind(this)({}, pageable).then(data => {
        const content = data.content;
        const page = data.page;
        pageable.page = page.number;
        pageable.size = page.size;
        initUserTable.bind(this)(content, page);
    });
}

function initUserTable(rows, page) {
    const tableNode = document.querySelector('#user-container #user-table');
    const tbodyNode = tableNode.querySelector('tbody');
    tbodyNode.innerHTML = '';
    for (let i = -1, no = 1; ++i < rows.length; ++no) {
        const row = rows[i];

        const trNode = document.createElement('tr');
        const noNode = document.createElement('th');
        const usernameNode = document.createElement('td');
        const nicknameNode = document.createElement('td');
        const emailNode = document.createElement('td');
        const mobileNode = document.createElement('td');
        const statusNode = document.createElement('td');
        const creatorNode = document.createElement('td');
        const gmtCreateNode = document.createElement('td');
        const gmtModifiedNode = document.createElement('td');

        noNode.setAttribute("scope", "row");

        noNode.innerText = no + (page.number * page.size) + '';
        usernameNode.innerText = row["username"];
        nicknameNode.innerText = row["nickname"];
        emailNode.innerText = row["email"];
        mobileNode.innerText = row["mobile"];
        statusNode.innerText = row["status"];
        creatorNode.innerText = row["creator"];
        gmtCreateNode.innerText = row["gmtCreate"];
        gmtModifiedNode.innerText = row["gmtModified"];

        trNode.appendChild(noNode);
        trNode.appendChild(usernameNode);
        trNode.appendChild(nicknameNode);
        trNode.appendChild(emailNode);
        trNode.appendChild(mobileNode);
        trNode.appendChild(statusNode);
        trNode.appendChild(creatorNode);
        trNode.appendChild(gmtCreateNode);
        trNode.appendChild(gmtModifiedNode);

        tbodyNode.appendChild(trNode);
    }

    const paginationNode = document.querySelector('#user-container #pagination');
    const navigationNode = paginationNode.querySelector('.navigation');
    navigationNode.innerHTML = '';
    let number = page["number"];
    let totalPages = page["totalPages"];
    for (let i = -1; ++i < totalPages;) {
        if (number === i) {
            const pageNode = document.createElement('span');
            const bNode = document.createElement('abbr');
            const numberNode = document.createTextNode((i + 1) + '');
            pageNode.classList.add("page");
            pageNode.classList.add("cursor");

            // pageNode.innerText = (i + 1) + '';

            bNode.innerText = "Page ";
            pageNode.appendChild(bNode);
            pageNode.appendChild(numberNode);

            navigationNode.appendChild(pageNode);
        } else {
            const pageNode = document.createElement('a');

            pageNode.classList.add("page");

            pageNode.href = "javascript:void(0)";

            pageNode.innerText = (i + 1) + '';

            navigationNode.appendChild(pageNode);
        }
    }
    const firstNode = paginationNode.querySelector('.first');
    if (1 < number) {
        firstNode.style.display = '';
    } else {
        firstNode.style.display = 'none';
    }

    const previousNode = paginationNode.querySelector('.previous');
    if (0 < number) {
        previousNode.style.display = '';
    } else {
        previousNode.style.display = 'none';
    }

    const nextNode = paginationNode.querySelector('.next');
    if (number + 1 < totalPages) {
        nextNode.style.display = '';
    } else {
        nextNode.style.display = 'none';
    }
}

export default defineComponent({
    name: "user",
    data() {
        return {
            username,
            pageable
        };
    },
    created() {
        initData.bind(this)();
    },
    methods: {
        usernameChange(event) {
            const target = event.target;
            this.username = target.value;
        },
        search() {
            queryUserList.bind(this)({username: this.username}, {page: 0, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initUserTable.bind(this)(content, page);
            });
        },
        firstPage() {
            queryUserList.bind(this)({username: this.username}, {page: 0, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initUserTable.bind(this)(content, page);
            });
        },
        previousPage() {
            queryUserList.bind(this)({username: this.username}, {page: pageable.page - 1, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initUserTable.bind(this)(content, page);
            });
        },
        nextPage() {
            queryUserList.bind(this)({username: this.username}, {page: pageable.page + 1, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initUserTable.bind(this)(content, page);
            });
        }
    },
});
