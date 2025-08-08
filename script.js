document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const faultInput = document.getElementById('faultInput');
    const diagnoseButton = document.getElementById('diagnoseButton');
    const faultOutput = document.getElementById('faultOutput');

    // Log to confirm elements are found
    console.log('DOM Content Loaded.');
    console.log('faultInput element:', faultInput);
    console.log('diagnoseButton element:', diagnoseButton);
    console.log('faultOutput element:', faultOutput);

    // Define the motor faults data
    // This data is manually extracted from the PDF "تشخيص أعطال المحركات الكهربائية: دليل شامل.pdf"
    // You will need to extend this array with more faults from your document.
    const motorFaults = [
        {
            keywords: "حساس درجة حرارة تالف, ضبط خاطئ لأجهزة الحماية, ارتفاع درجة حرارة السائل",
            preciseFault: "مشاكل في نظام الحماية من درجة حرارة السوائل: يفشل نظام الحماية في منع تشغيل المحرك بسائل بدرجة حرارة غير مناسبة.",
            cause: "مشاكل في نظام الحماية من درجة حرارة السوائل.",
            correction: "استبدال حساس درجة حرارة السائل التالف، إعادة ضبط أجهزة الحماية."
        },
        {
            keywords: "حساس الضغط التفاضلي تالف, ضبط خاطئ لأجهزة الحماية, تجاوز الضغط المسموح به",
            preciseFault: "مشاكل في نظام الحماية من الضغط التفاضلي: يفشل نظام الحماية في فصل المحرك عند تجاوز الضغط التفاضلي للحد المسموح به.",
            cause: "مشاكل في نظام الحماية من الضغط التفاضلي.",
            correction: "استبدال حساس الضغط التفاضلي التالف، إعادة ضبط أجهزة الحماية."
        },
        {
            keywords: "اهتزازات, صوت غير طبيعي, المحرك يهتز",
            preciseFault: "اهتزازات ميكانيكية: اهتزازات زائدة في المحرك أثناء التشغيل.",
            cause: "اختلال توازن الدوار، محاذاة خاطئة، تآكل المحامل، قاعدة تثبيت غير مستقرة.",
            correction: "إعادة وزن الدوار، إعادة محاذاة المحرك والآلة، استبدال المحامل التالفة، تقوية قاعدة التثبيت."
        },
        {
            keywords: "ارتفاع التيار, ارتفاع درجة الحرارة, رائحة احتراق, قصر الدائرة",
            preciseFault: "ارتفاع درجة حرارة اللفات: ارتفاع درجة حرارة لفات المحرك بشكل غير طبيعي.",
            cause: "تحميل زائد، جهد غير متوازن، تهوية غير كافية، قصر في اللفات.",
            correction: "تقليل الحمل، تصحيح الجهد، تنظيف فتحات التهوية، إعادة لف المحرك أو استبداله."
        },
        {
            keywords: "المحرك لا يدور, لا يوجد حركة, طنين",
            preciseFault: "المحرك لا يدور: المحرك لا يبدأ التشغيل أو يدور ببطء شديد.",
            cause: "فقدان إحدى مراحل الجهد (في المحركات ثلاثية الأطوار)، جهد منخفض، قصر في الدائرة، عطل في المكثف (في المحركات أحادية الطور).",
            correction: "فحص مصدر الجهد، قياس الجهد، فحص الأسلاك، استبدال المكثف."
        }
        // Add more faults here following the same structure
    ];

    // Function to diagnose the fault
    function diagnoseFault() {
        console.log('Diagnose button clicked!'); // Log when button is clicked
        const inputKeywords = faultInput.value.toLowerCase().trim();
        console.log('Input Keywords:', inputKeywords); // Log the raw input

        // Split input into individual keywords for better matching
        const searchTerms = inputKeywords.split(/[\s,]+/).filter(term => term.length > 0);
        console.log('Search Terms (processed):', searchTerms); // Log processed search terms

        let foundFaults = [];

        // If no search terms, display a message and exit
        if (searchTerms.length === 0) {
            faultOutput.innerHTML = '<p class="text-center text-gray-500">الرجاء إدخال بعض المؤشرات أو وصف العطل للتشخيص.</p>';
            console.log('No search terms entered.');
            return; // Exit the function
        }

        // Iterate through the predefined faults
        motorFaults.forEach((fault, index) => {
            // Combine fault keywords and precise fault description for comprehensive search
            const faultText = (fault.keywords + " " + fault.preciseFault).toLowerCase();
            console.log(`Checking fault ${index + 1}:`, faultText); // Log the fault text being checked

            let match = false;
            for (const term of searchTerms) {
                if (faultText.includes(term)) {
                    match = true;
                    console.log(`Match found for term "${term}" in fault ${index + 1}.`);
                    break; // Found a match, no need to check other terms for this fault
                }
            }

            if (match) {
                foundFaults.push(fault);
            }
        });

        console.log('Found Faults Array:', foundFaults); // Log the array of found faults

        // Display results
        faultOutput.innerHTML = ''; // Clear previous results

        if (foundFaults.length > 0) {
            foundFaults.forEach((fault, index) => {
                const faultDiv = document.createElement('div');
                faultDiv.className = 'mb-4 p-4 border border-blue-300 bg-blue-100 rounded-lg';
                faultDiv.innerHTML = `
                    <p class="font-semibold text-blue-700 mb-1">سبب العطل:</p>
                    <p class="mb-3">${fault.cause}</p>
                    <p class="font-semibold text-blue-700 mb-1">العطل بدقة:</p>
                    <p class="mb-3">${fault.preciseFault}</p>
                    <p class="font-semibold text-blue-700 mb-1">تصحيح العطل:</p>
                    <p>${fault.correction}</p>
                `;
                faultOutput.appendChild(faultDiv);
            });
        } else {
            faultOutput.innerHTML = '<p class="text-center text-gray-500">لم يتم العثور على عطل مطابق للمؤشرات المدخلة. يرجى محاولة كلمات مفتاحية أخرى أو وصف أكثر دقة.</p>';
        }
    }

    // Add event listener to the diagnose button
    diagnoseButton.addEventListener('click', diagnoseFault);

    // Optional: Allow diagnosis on Enter key press in the textarea
    faultInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) { // Check for Enter key, but not Shift+Enter
            event.preventDefault(); // Prevent new line in textarea
            diagnoseFault();
        }
    });
});
