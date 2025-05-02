// noinspection DuplicatedCode

import {defineComponent} from "vue";

let roleName = "";
let pageable = {
    page: 0,
    size: 10
};


function queryRoleList(param, {page, size}) {
    const timestamp = "?timestamp=" + new Date().getTime();
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/sys/role/queryrolelist" + timestamp + "&page=" + page + "&size=" + size,
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
    queryRoleList.bind(this)({}, pageable).then(data => {
        const content = data.content;
        const page = data.page;
        pageable.page = page.number;
        pageable.size = page.size;
        initRoleTable.bind(this)(content, page);
    });
}

function initRoleTable(rows, page) {
    const tableNode = document.querySelector('#role-container #role-table');
    const tbodyNode = tableNode.querySelector('tbody');
    tbodyNode.innerHTML = '';
    for (let i = -1, no = 1; ++i < rows.length; ++no) {
        const row = rows[i];

        const trNode = document.createElement('tr');
        const noNode = document.createElement('th');
        const roleNameNode = document.createElement('th');
        const remarkNode = document.createElement('td');
        const gmtCreateNode = document.createElement('td');
        const gmtModifiedNode = document.createElement('td');

        noNode.setAttribute("scope", "row");

        noNode.innerText = no + (page.number * page.size) + '';
        roleNameNode.innerText = row["roleName"];
        remarkNode.innerText = row["remark"];
        gmtCreateNode.innerText = row["gmtCreate"];
        gmtModifiedNode.innerText = row["gmtModified"];

        trNode.appendChild(noNode);
        trNode.appendChild(roleNameNode);
        trNode.appendChild(remarkNode);
        trNode.appendChild(gmtCreateNode);
        trNode.appendChild(gmtModifiedNode);

        tbodyNode.appendChild(trNode);
    }

    const paginationNode = document.querySelector('#role-container #pagination');
    const navigationNode = paginationNode.querySelector('.navigation');
    navigationNode.innerHTML = '';
    let number = page["number"];
    let totalPages = page["totalPages"];
    for (let i = -1; ++i < totalPages; ) {
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

            pageNode.href="javascript:void(0)";

            pageNode.innerText = (i + 1) + '';

            navigationNode.appendChild(pageNode);
        }
    }
    const firstNode = paginationNode.querySelector('.first');
    if (1 < number) {
        firstNode.style.display = '';
    }
    else {
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
    name: "log",
    data() {
        return {
            roleName,
            pageable
        };
    },
    created() {
        initData.bind(this)();
    },
    methods: {
        roleNameChange(event) {
            const target = event.target;
            this.roleName = target.value;
        },
        search() {
            queryRoleList.bind(this)({username: this.username}, {page: 0, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initRoleTable.bind(this)(content, page);
            });
        },
        firstPage() {
            queryRoleList.bind(this)({username: this.username}, {page: 0, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initRoleTable.bind(this)(content, page);
            });
        },
        previousPage() {
            queryRoleList.bind(this)({username: this.username}, {page: pageable.page - 1, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initRoleTable.bind(this)(content, page);
            });
        },
        nextPage() {
            queryRoleList.bind(this)({username: this.username}, {page: pageable.page + 1, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initRoleTable.bind(this)(content, page);
            });
        }
    },
});
