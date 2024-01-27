/**
 * @title �A���P�[�g�񓚃u�b�N�}�[�N���b�g
 * @description �A���P�[�g�������񓚂���u�b�N�}�[�N���b�g
 * @license MIT License
 * @author Neo http://neo.s21.xrea.com/
 */
function SurveyHelpers(myInfo, settings) {
  console.log("a");
  // �������w��̏ꍇ�͒��~����
  if (!myInfo || !settings) {
    return;
  }
  console.log("b");
  // �l���
  const cityName = myInfo.cityName || "�s���{��"; // �s���{�� : �u�s���{���v�͏����Ȃ�
  const districtName = myInfo.districtName || "�s����"; // �s���� : ����23��p�E�u��v�͏����Ȃ�
  const age = myInfo.age || 999; // �N��
  const ageRange = myInfo.ageRange || 999; // �N��w : �u20��v�Ƃ��u20�`29�΁v�Ƃ��̑I�����p
  const birthYear = myInfo.birthYear || 9999; // �a���N
  const birthMonth = myInfo.birthMonth || 13; // �a����
  const birthDate = myInfo.birthDate || 32; // �a����
  const gender = myInfo.gender || "����"; // ���� : '�j' �� '��' �������z��
  const marriage = myInfo.marriage || "�������"; // ������� : '����' �� '����' �������z��
  const jobRegExp = myInfo.jobRegExp || "�E��"; // �E�� : ���K�\�� "()" �ň͂�� OR ��������̂� "|" �ŋ�؂�

  // �ݒ荀��
  const loop = settings.loop || 5; // �e�v�f��k��K�w��

  // �Z���N�g�{�b�N�X�I��
  // --------------------------------------------------------------------------------

  // �Z���N�g�{�b�N�X�Ŏg�p��������܂Ƃ�
  const optionConditions = {
    // �Z�����N��a����
    something: new RegExp(
      cityName +
        "|" +
        districtName +
        "|" +
        age +
        ".*[��|��]" +
        "|" +
        birthYear +
        "|" +
        birthMonth +
        ".*��" +
        "|" +
        birthDate +
        ".*��"
    ),
  };

  // select �v�f��T������
  Array.prototype.forEach.call(
    document.querySelectorAll("select"),
    (select) => {
      // ���� select �v�f���� option �v�f�ŒT�����I������ꍇ�͏����𒆒f���邽�߂̃t���O
      let finished = false;

      Array.prototype.forEach.call(
        select.querySelectorAll("option"),
        (option) => {
          // ���� select �v�f���T���ςȂ璆�f����
          if (finished) {
            return;
          }

          const innerHTML = option.innerHTML;

          if (optionConditions.something.test(innerHTML)) {
            // �����ꂩ�̏��ɍ��v������ option �v�f��I������
            option.selected = true;
            finished = true;
          } else if (/1|2/.test(innerHTML)) {
            // 1 �� 2 ���܂܂�Ă����猎�����̃Z���N�g�{�b�N�X�Ɨ\�z���ď�������
            let isMonth = false;
            let isDate = false;

            // ���� option �v�f���������� select �v�f��S�T�����āA�Z���N�g�{�b�N�X���������̃Z���N�g�{�b�N�X���ǂ������肷��
            Array.prototype.forEach.call(
              select.querySelectorAll("option"),
              (selectOption) => {
                const selectOptionInnerHTML = selectOption.innerHTML;

                if (selectOptionInnerHTML.includes(12)) {
                  // 12 ���܂ޑI����������΁u���v�Z���N�g�{�b�N�X�Ɨ\�z����
                  isMonth = true;
                } else if (selectOptionInnerHTML.includes(13)) {
                  // 13 ���܂ޑI����������΁u���v�ł͂Ȃ��u���v�Z���N�g�{�b�N�X�Ɨ\�z����
                  isMonth = false;
                  isDate = true;
                } else if (selectOptionInnerHTML.includes(32)) {
                  // 32 ���܂ޑI����������΁u���v�ł��u���v�ł��Ȃ� (�s���{���Z���N�g�{�b�N�X�Ȃǂ̍��ԂƔ���)
                  isMonth = false;
                  isDate = false;
                }
              }
            );

            // �u���v�Z���N�g�{�b�N�X�������́u���v�Z���N�g�{�b�N�X�Ɨ\�z�������ɑΏۂ� option �v�f��I������
            if (
              (isMonth && innerHTML.includes(birthMonth)) ||
              (isDate && innerHTML.includes(birthDate))
            ) {
              option.selected = true;
              finished = true;
            }
          }
        }
      );
    }
  );

  // �e�L�X�g�{�b�N�X����
  // --------------------------------------------------------------------------------

  // Type �� text �� tel �̗v�f��T������
  Array.prototype.forEach.call(
    document.querySelectorAll("[type=text],[type=tel]"),
    (textbox) => {
      // �e�v�f�ɑk���Ă������߂̕ϐ�
      let parent = textbox;
      // �e�v�f��k���Ă̒T�����ς�ł��邱�Ƃ������t���O
      let finished = false;

      // �e�v�f��k��
      for (let i = 0; i < loop; i++) {
        // �T���ςȂ璆�f����
        if (finished) {
          continue;
        }

        // �e�v�f�� innerHTML ���擾����
        parent = parent.parentNode;
        const innerHTML = parent.innerHTML;

        // �e�v�f�� innerHTML ���炻��炵�����������t������Ή�����l��ݒ肷��
        if (/��|��/.test(innerHTML)) {
          textbox.value = age;
          finished = true;
        } else if (innerHTML.includes("�N")) {
          textbox.value = birthYear;
          finished = true;
        } else if (innerHTML.includes("��")) {
          textbox.value = birthMonth;
          finished = true;
        } else if (innerHTML.includes("��")) {
          textbox.value = birthDate;
          finished = true;
        }
      }
    }
  );

  // ���W�I�{�^���I��
  // --------------------------------------------------------------------------------

  // ���W�I�{�^���Ŏg�p��������܂Ƃ�
  const radioConditions = {
    // �s���{�����s���悩���ʂ��N��w���E�Ƃ��������
    something: new RegExp(
      cityName +
        "|" +
        districtName +
        "|" +
        gender +
        "|" +
        ageRange +
        ".*[�`|��](?!����)" +
        "|" +
        "(" +
        jobRegExp +
        ")" +
        "|" +
        marriage
    ),
  };

  // 1�O�ɒT���������W�I�{�^���̏����T���Ă��� : ��胉�W�I�{�^���ɋ߂��K�w�ŊY�����ڂ����t��������D�悳���邽��
  const radioPrev = {
    name: "",
    loop: -1,
  };

  // Type �� radio �̗v�f��T������
  Array.prototype.forEach.call(
    document.querySelectorAll("[type=radio]"),
    (radio) => {
      // �قȂ郉�W�I�{�^���Q���o�Ă�����A���O�ɒT���������W�I�{�^���̏������Z�b�g����
      if (
        radioPrev.name !== "" &&
        radioPrev.loop !== -1 &&
        radio.name !== radioPrev.name
      ) {
        radioPrev.name = "";
        radioPrev.loop = -1;
      }

      // �e�v�f�ɑk���Ă������߂̕ϐ�
      let parent = radio;
      // �e�v�f��k���Ă̒T�����ς�ł��邱�Ƃ������t���O
      let finished = false;

      // �e�v�f��k��
      for (let i = 0; i < loop; i++) {
        // �T���ςȂ璆�f����
        if (finished) {
          continue;
        }

        // �e�v�f�� innerHTML ���擾����
        parent = parent.parentNode;
        let innerHTML = parent.innerHTML;

        // ���̃��W�I�{�^���Q�ŏ��߂Ă̏ꍇ���A���߂����W�I�{�^�������t������
        if (
          radioConditions.something.test(innerHTML) &&
          ((radioPrev.name === "" && radioPrev.loop === -1) ||
            (radio.name === radioPrev.name && i < radioPrev.loop))
        ) {
          // �T���������W�I�{�^���̏��Ƃ��ēo�^���Ă���
          radioPrev.name = radio.name;
          radioPrev.loop = i;
          radio.checked = true;
          finished = true;
        }
      }
    }
  );
}
