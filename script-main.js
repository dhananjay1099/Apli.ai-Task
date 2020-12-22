const questions = [
	{
		text: "What's your name1?",
		video: "https://www.youtube.com/embed/yqlbn_nI2w8",
		grade: 0,
		comment: "Dummy comment"
	},
	{
		text: "What's your name2?",
		video: "https://www.youtube.com/embed/yqlbn_nI2w8",
		grade: 0,
		comment: ""
	},
	{
		text: "What's your name3?",
		video: "https://www.youtube.com/embed/yqlbn_nI2w8",
		grade: 0,
		comment: ""
	},
	{
		text: "What's your name4?",
		video: "https://www.youtube.com/embed/yqlbn_nI2w8",
		grade: 0,
		comment: ""
	},
	{
		text: "What's your name5?",
		video: "https://www.youtube.com/embed/yqlbn_nI2w8",
		grade: 0,
		comment: ""
	},
	{
		text: "What's your name6?",
		video: "https://www.youtube.com/embed/yqlbn_nI2w8",
		grade: 0,
		comment: ""
	},
	{
		text: "What's your name7?",
		video: "https://www.youtube.com/embed/yqlbn_nI2w8",
		grade: 0,
		comment: ""
	}
];

let activeQuestion = 0;

const createQuestionList = () => {
	const questionList = document.getElementById('question-list');
	questionList.innerHTML = "";
	questions.forEach((question, questionNumber) => {
		const questionNumberNode = document.createElement('span');
		questionNumberNode.classList.add('question-number');
		if (questionNumber === activeQuestion) {
			questionNumberNode.classList.add('active');
		}
		questionNumberNode.onclick = e => changeQuestion(questionNumber);
		questionNumberNode.innerHTML = questionNumber + 1;
		questionList.appendChild(questionNumberNode);
	});
};

const displayGrade = () => {
	const question = questions[activeQuestion];
	const questionGrade = document.getElementById('question-grade');
	Array.from(questionGrade.children).forEach((star, starNumber) => {
		star.onclick = e => changeGrade(starNumber + 1);
		if (starNumber < question.grade) {
			star.classList.add('checked');
		} else {
			star.classList.remove('checked');
		}
	});
}

const displayQuestion = () => {
	const question = questions[activeQuestion];

	const questionText = document.getElementById('question-text');
	questionText.textContent = question.text;

	const questionVideo = document.getElementById('question-video');
	questionVideo.src = question.video;

	displayGrade();

	const questionComment = document.getElementById('question-comment');
	questionComment.value = question.comment;
}

const generateQuestionUI = () => {
	document.getElementById('result-ui').style.display = 'none';
	createQuestionList();
	displayQuestion();
	document.getElementById('question-ui').style.display = 'block';
}

const changeQuestion = (questionNumber) => {
	activeQuestion = questionNumber;
	generateQuestionUI();
}

const changeGrade = (grade) => {
	questions[activeQuestion].grade = grade;
	displayGrade();
}

const generateResultUI = () => {
	document.getElementById('question-ui').style.display = 'none';
	const resultTable = document.getElementById('result-table');
	resultTable.innerHTML = `
		<thead>
			<tr>
				<th>Question</th>
				<th>Grade</th>
				<th>Comments</th>
			</tr>
		</thead>
		<tbody></tbody>
	`;
	const resultTableBody = resultTable.querySelector('tbody');
	questions.forEach((question, questionNumber) => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${question.text}</td>
			<td>${question.grade}</td>
			<td>${question.comment}</td>
		`;
		resultTableBody.appendChild(row);
	});
	document.getElementById('result-ui').style.display = 'block';
};

const prevQuestion = () => {
	if (activeQuestion == 0) return;
	activeQuestion--;
	generateQuestionUI();
}

const nextQuestion = () => {
	if (activeQuestion == questions.length - 1) {
		generateResultUI();
	} else {
		activeQuestion++;
		generateQuestionUI();
	}
}

generateQuestionUI();

document.getElementById('question-comment').addEventListener('keypress', e => {
	const questionComment = document.getElementById('question-comment');
	questions[activeQuestion].comment = questionComment.value;
});

