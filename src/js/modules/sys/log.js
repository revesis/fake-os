// noinspection DuplicatedCode

import {defineComponent} from "vue";

let username = "";
let pageable = {
    page: 0,
    size: 10
};


function queryLogList(param, {page, size}) {
    const timestamp = "?timestamp=" + new Date().getTime();
    return new Promise((resolve, reject) => {
        this.$http({
            url: "/sys/log/queryloglist" + timestamp + "&page=" + page + "&size=" + size,
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
    queryLogList.bind(this)({}, pageable).then(data => {
        const content = data.content;
        const page = data.page;
        pageable.page = page.number;
        pageable.size = page.size;
        initLogTable.bind(this)(content, page);
    });
}

function initLogTable(rows, page) {
    const tableNode = document.querySelector('#log-container #log-table');
    const tbodyNode = tableNode.querySelector('tbody');
    tbodyNode.innerHTML = '';
    for (let i = -1, no = 1; ++i < rows.length; ++no) {
        const row = rows[i];

        const trNode = document.createElement('tr');
        const noNode = document.createElement('th');
        const logNameNode = document.createElement('td');
        const logTypeNode = document.createElement('td');
        const eventTypeNode = document.createElement('td');
        const usernameNode = document.createElement('td');
        const serviceNode = document.createElement('td');
        const detailNode = document.createElement('td');
        const ipv4Node = document.createElement('td');
        const deviceInfoNode = document.createElement('td');
        const gmtCreateNode = document.createElement('td');
        const gmtModifiedNode = document.createElement('td');

        noNode.setAttribute("scope", "row");

        noNode.innerText = no + (page.number * page.size) + '';
        logNameNode.innerText = row["logName"];
        logTypeNode.innerText = row["logType"];
        eventTypeNode.innerText = row["eventType"];
        usernameNode.innerText = row["username"];
        serviceNode.innerText = row["service"];
        detailNode.innerText = row["detail"];
        ipv4Node.innerText = row["ipv4Address"];
        deviceInfoNode.innerText = row["deviceInfo"];
        gmtCreateNode.innerText = row["gmtCreate"];
        gmtModifiedNode.innerText = row["gmtModified"];

        deviceInfoNode.title = row["deviceInfo"];

        trNode.appendChild(noNode);
        trNode.appendChild(logNameNode);
        trNode.appendChild(logTypeNode);
        trNode.appendChild(eventTypeNode);
        trNode.appendChild(usernameNode);
        trNode.appendChild(serviceNode);
        trNode.appendChild(detailNode);
        trNode.appendChild(ipv4Node);
        trNode.appendChild(deviceInfoNode);
        trNode.appendChild(gmtCreateNode);
        trNode.appendChild(gmtModifiedNode);

        tbodyNode.appendChild(trNode);
    }

    const paginationNode = document.querySelector('#log-container #pagination');
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
            queryLogList.bind(this)({username: this.username}, {page: 0, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initLogTable.bind(this)(content, page);
            });
        },
        firstPage() {
            queryLogList.bind(this)({username: this.username}, {page: 0, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initLogTable.bind(this)(content, page);
            });
        },
        previousPage() {
            queryLogList.bind(this)({username: this.username}, {page: pageable.page - 1, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initLogTable.bind(this)(content, page);
            });
        },
        nextPage() {
            queryLogList.bind(this)({username: this.username}, {page: pageable.page + 1, size: pageable.size}).then(data => {
                const content = data.content;
                const page = data.page;
                this.pageable.page = page.number;
                this.pageable.size = page.size;
                initLogTable.bind(this)(content, page);
            });
        }
    }
});
