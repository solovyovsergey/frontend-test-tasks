document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('js-form');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const formResults = {
        name: formData.get('name'),
        moodColor: formData.get('mood_color'),
        comment: formData.get('comment') || 'Не оставлен',
        radioStatus: formData.get('radio_group') ? 'Выбран' : 'Не выбран',
        agreement:
          formData.get('agree_all') === 'yes' ? 'Принято' : 'Отклонено',
      };

      const alertMessage = [
        'Данные формы успешно собраны:',
        `Имя: ${formResults.name}`,
        `Цвет настроения: ${formResults.moodColor}`,
        `Комментарий: ${formResults.comment}`,
        `Радиобатон: ${formResults.radioStatus}`,
        `Согласие: ${formResults.agreement}`,
      ].join('\n');

      alert(alertMessage);
      console.table(formResults);
    });
  }
});
