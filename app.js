document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const questionDiv = document.getElementById('question');
    const choicesDiv = document.getElementById('choices');
    const feedbackDiv = document.getElementById('feedback');
    const topFansOl = document.getElementById('topFans');
    const quizSection = document.getElementById('quiz');

    let playerName = '';
    let score = 0;
    let currentQuestionIndex = 0;
    const topFans = [];

    const questions = [
        { question: "متى تأسس نادي الهلال؟", answer: "1957", choices: ["1957", "1960", "1953", "1955"] },
        { question: "ما هو لقب نادي الهلال؟", answer: "الزعيم", choices: ["الزعيم", "العميد", "الملكي", "الأسطورة"] },
        { question: "ما هي ألوان شعار نادي الهلال؟", answer: "الأزرق والأبيض", choices: ["الأزرق والأبيض", "الأحمر والأسود", "الأخضر والأبيض", "الأصفر والأزرق"] },
        { question: "ما هو اسم ملعب نادي الهلال؟", answer: "المملكة أرينا", choices: ["المملكة أرينا", "استاد الملك فهد", "ملعب جامعة الملك سعود", "استاد الأمير فيصل بن فهد"] },
        { question: "كم عدد بطولات الدوري التي حققها الهلال حتى 2023؟", answer: "18", choices: ["18", "16", "15", "17"] },
        { question: "ما هو النادي الذي يعتبر المنافس التقليدي لنادي الهلال؟", answer: "النصر", choices: ["النصر", "الاتحاد", "الأهلي", "الشباب"] },
        { question: "من هو رئيس نادي الهلال الحالي حتى 2023؟", answer: "فهد بن نافل", choices: ["فهد بن نافل", "محمد بن فيصل", "عبد الله الجربوع", "سامي الجابر"] },
        { question: "كم مرة فاز الهلال بكأس الملك حتى 2023؟", answer: "9", choices: ["9", "8", "7", "10"] },
        { question: "ما هو أكبر فوز حققه نادي الهلال في تاريخه؟", answer: "10-0", choices: ["10-0", "9-0", "8-0", "7-0"] },
        { question: "ما هو أكبر خسارة تعرض لها نادي الهلال؟", answer: "0-5", choices: ["0-5", "1-4", "0-4", "2-5"] },
        { question: "ما هو العام الذي حقق فيه الهلال أول بطولة دوري؟", answer: "1977", choices: ["1977", "1976", "1978", "1979"] },
        { question: "من هو اللاعب الذي يحمل الرقم 10 في نادي الهلال حتى 2023؟", answer: "سالم الدوسري", choices: ["سالم الدوسري", "محمد الشلهوب", "نواف العابد", "ياسر القحطاني"] },
        { question: "كم عدد البطولات الآسيوية التي حققها الهلال حتى 2023؟", answer: "8", choices: ["8", "7", "6", "9"] },
        { question: "من هو قائد نادي الهلال الحالي حتى 2023؟", answer: "سلمان الفرج", choices: ["سلمان الفرج", "محمد الشلهوب", "ياسر القحطاني", "عبد الله عطيف"] },
        { question: "من هو المدرب الحالي لنادي الهلال حتى 2023؟", answer: "جيسوس", choices: ["جيسوس", "رامون دياز", "زوران ماميتش", "رازفان لوشيسكو"] },
        { question: "ما هو أكثر موسم سجل فيه الهلال أهدافاً حتى 2023؟", answer: "2019-2020", choices: ["2019-2020", "2018-2019", "2017-2018", "2020-2021"] },
        { question: "من هو أكثر لاعب سجل أهدافاً لنادي الهلال حتى 2023؟", answer: "سامي الجابر", choices: ["سامي الجابر", "يوسف الثنيان", "ياسر القحطاني", "بافيتيمبي غوميز"] },
        { question: "كم مرة فاز الهلال بدوري أبطال آسيا حتى 2023؟", answer: "4", choices: ["4", "3", "5", "6"] },
        { question: "من هو هداف الهلال في دوري المحترفين السعودي حتى 2023؟", answer: "بافيتيمبي غوميز", choices: ["بافيتيمبي غوميز", "ياسر القحطاني", "ناصر الشمراني", "سالم الدوسري"] },
        { question: "من هو اللاعب الأكثر مشاركة في تاريخ الهلال حتى 2023؟", answer: "محمد الشلهوب", choices: ["محمد الشلهوب", "سامي الجابر", "ياسر القحطاني", "محمد الدعيع"] },
        { question: "ما هو اسم أول رئيس لنادي الهلال؟", answer: "عبد الرحمن بن سعيد", choices: ["عبد الرحمن بن سعيد", "محمد بن فيصل", "فهد بن نافل", "سامي الجابر"] },
        { question: "ما هو عدد البطولات الإجمالية التي حققها نادي الهلال حتى 2023؟", answer: "65", choices: ["65", "60", "55", "70"] },
        { question: "ما هو أول ملعب استخدمه نادي الهلال؟", answer: "ملعب الصائغ", choices: ["ملعب الصائغ", "استاد الملك فهد", "استاد الأمير فيصل بن فهد", "ملعب جامعة الملك سعود"] },
        { question: "من هو اللاعب الذي سجل أول هدف في تاريخ نادي الهلال؟", answer: "مبارك عبد الكريم", choices: ["مبارك عبد الكريم", "يوسف الثنيان", "سامي الجابر", "ياسر القحطاني"] },
        { question: "ما هو أول موسم شارك فيه الهلال في الدوري السعودي؟", answer: "1976-1977", choices: ["1976-1977", "1977-1978", "1978-1979", "1979-1980"] },
        { question: "ما هو ترتيب الهلال في أول موسم دوري شارك فيه؟", answer: "الثاني", choices: ["الثاني", "الأول", "الثالث", "الرابع"] },
        { question: "من هو أول لاعب أجنبي انضم لنادي الهلال؟", answer: "أديموس", choices: ["أديموس", "بافيتيمبي غوميز", "رادوي", "نيفيز"] },
        { question: "ما هو عدد الأهداف التي سجلها الهلال في أول موسم دوري؟", answer: "40", choices: ["40", "45", "50", "55"] },
        { question: "من هو اللاعب الذي يحمل الرقم 7 في نادي الهلال حتى 2023؟", answer: "عبد الله عطيف", choices: ["عبد الله عطيف", "سالم الدوسري", "محمد الشلهوب", "نواف العابد"] },
        { question: "ما هو أكبر عدد من الأهداف سجله الهلال في مباراة واحدة؟", answer: "10", choices: ["10", "9", "8", "7"] },
        { question: "ما هو أكبر عدد من الأهداف استقبلها الهلال في مباراة واحدة؟", answer: "5", choices: ["5", "4", "6", "3"] },
        { question: "من هو اللاعب الذي سجل أكثر عدد من الأهداف في موسم واحد لنادي الهلال؟", answer: "بافيتيمبي غوميز", choices: ["بافيتيمبي غوميز", "سامي الجابر", "ياسر القحطاني", "عمر خربين"] },
        { question: "ما هو أول موسم فاز فيه الهلال بكأس الملك؟", answer: "1962", choices: ["1962", "1963", "1964", "1965"] },
        { question: "من هو اللاعب الذي سجل أول هدف للهلال في دوري أبطال آسيا؟", answer: "سامي الجابر", choices: ["سامي الجابر", "يوسف الثنيان", "ياسر القحطاني", "نواف العابد"] },
        { question: "ما هو أول موسم فاز فيه الهلال بدوري أبطال آسيا؟", answer: "1991", choices: ["1991", "1992", "1993", "1994"] },
        { question: "من هو اللاعب الذي سجل هدف الفوز في نهائي دوري أبطال آسيا 2000؟", answer: "سامي الجابر", choices: ["سامي الجابر", "يوسف الثنيان", "ياسر القحطاني", "نواف العابد"] },
        { question: "كم عدد المباريات التي لعبها الهلال في دوري أبطال آسيا 2019؟", answer: "13", choices: ["13", "14", "15", "12"] },
        { question: "من هو اللاعب الذي سجل أكثر عدد من الأهداف في دوري أبطال آسيا 2019؟", answer: "بافيتيمبي غوميز", choices: ["بافيتيمبي غوميز", "ياسر القحطاني", "ناصر الشمراني", "سالم الدوسري"] },
        { question: "ما هو عدد الأهداف التي سجلها الهلال في دوري أبطال آسيا 2019؟", answer: "23", choices: ["23", "24", "25", "22"] },
        { question: "ما هو عدد الأهداف التي سجلها يوسف الثنيان في مسيرته مع الهلال؟", answer: "228", choices: ["228", "220", "230", "235"] },
        { question: "من هو اللاعب الذي يحمل الرقم 9 في نادي الهلال حتى 2023؟", answer: "أوديون إيغالو", choices: ["أوديون إيغالو", "ياسر القحطاني", "ناصر الشمراني", "بافيتيمبي غوميز"] },
        { question: "ما هو عدد الأهداف التي سجلها سامي الجابر في مسيرته مع الهلال؟", answer: "173", choices: ["173", "170", "175", "180"] },
        { question: "من هو اللاعب الذي سجل هدف الفوز في نهائي دوري أبطال آسيا 2019؟", answer: "سالم الدوسري", choices: ["سالم الدوسري", "بافيتيمبي غوميز", "ياسر القحطاني", "ناصر الشمراني"] },
        { question: "ما هو عدد الأهداف التي سجلها عمر خربين في دوري أبطال آسيا 2017؟", answer: "10", choices: ["10", "9", "11", "12"] },
        { question: "من هو اللاعب الذي سجل هدف الفوز في نهائي دوري أبطال آسيا 2017؟", answer: "عمر خربين", choices: ["عمر خربين", "سالم الدوسري", "ياسر القحطاني", "ناصر الشمراني"] },
        { question: "ما هو عدد المباريات التي لعبها محمد الدعيع مع الهلال؟", answer: "273", choices: ["273", "270", "275", "280"] },
        { question: "ما هو عدد الأهداف التي سجلها ياسر القحطاني في مسيرته مع الهلال؟", answer: "136", choices: ["136", "130", "140", "145"] },
        { question: "من هو اللاعب الذي سجل أكثر عدد من الأهداف في موسم واحد في تاريخ الهلال؟", answer: "بافيتيمبي غوميز", choices: ["بافيتيمبي غوميز", "عمر خربين", "ياسر القحطاني", "سامي الجابر"] },
        { question: "ما هو عدد الأهداف التي سجلها ناصر الشمراني في مسيرته مع الهلال؟", answer: "54", choices: ["54", "50", "55", "60"] }
    ];

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        playerName = document.getElementById('name').value;
        alert('تم التسجيل بنجاح');
        registrationForm.parentElement.classList.add('hidden');
        quizSection.classList.remove('hidden');
        showNextQuestion();
    });

    function selectAnswer(event) {
        const selectedChoice = event.currentTarget.querySelector('input[name="choice"]');
        const answer = selectedChoice.value;
        if (answer === questions[currentQuestionIndex].answer) {
            score += 2; // كل سؤال يعادل نقطتين
            feedbackDiv.textContent = 'إجابة صحيحة!';
        } else {
            feedbackDiv.textContent = `إجابة خاطئة! الإجابة الصحيحة هي: ${questions[currentQuestionIndex].answer}`;
        }
        setTimeout(() => {
            currentQuestionIndex++;
            showNextQuestion();
        }, 2000); // الانتظار لمدة 2 ثانية قبل الانتقال للسؤال التالي
    }

    function showNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            questionDiv.textContent = questions[currentQuestionIndex].question;
            choicesDiv.innerHTML = '';
            questions[currentQuestionIndex].choices.forEach(choice => {
                const choiceElement = document.createElement('div');
                choiceElement.classList.add('choice');
                choiceElement.innerHTML = `
                    <input type="radio" name="choice" value="${choice}" id="choice_${choice}">
                    <label for="choice_${choice}">${choice}</label>
                `;
                choiceElement.addEventListener('click', selectAnswer);
                choicesDiv.appendChild(choiceElement);
            });
            feedbackDiv.textContent = '';
        } else {
            showFinalScore();
        }
    }

    function showFinalScore() {
        questionDiv.textContent = "لقد انتهيت من الاختبار! مجموع نقاطك: " + score;
        choicesDiv.innerHTML = '';

        // إضافة اللاعب إلى جدار الشرف وترتيب القائمة
        topFans.push({ name: playerName, score: score });
        topFans.sort((a, b) => b.score - a.score);
        if (topFans.length > 10) topFans.pop(); // الحفاظ على أعلى 10 فقط

        // تحديث عرض جدار الشرف
        topFansOl.innerHTML = '';
        topFans.forEach((fan, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${fan.name} - ${fan.score} نقاط`;
            topFansOl.appendChild(li);
        });

        // عرض الرسالة النهائية بناءً على النقاط
        let message = '';
        if (score <= 40) {
            message = 'انتمائك مشكوك فيه روح دور ناديك';
        } else if (score <= 60) {
            message = 'شكلك مشجع جديد بس شد حيلك';
        } else if (score <= 80) {
            message = 'هلالي صميم';
        } else {
            message = 'انت اسطورة الكيان وزعيمهم';
        }
        feedbackDiv.textContent = message;
    }

    showNextQuestion();
});
