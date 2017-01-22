var emotionsColors = {
  'Anger' : 'rgb(239, 0, 0)',
  'Disgust' : 'rgb(99, 1, 196)',
  'Fear': 'rgb(0, 0, 0)',
  'Joy' : 'rgb(5, 255, 46)',
  'Sadness' : 'rgb(1, 73, 218)'
}


$(function() {
    $('#easypiechart-anger').easyPieChart({
        scaleColor: false,
        barColor: emotionsColors['Anger']
    });
});

$(function() {
    $('#easypiechart-disgust').easyPieChart({
        scaleColor: false,
        barColor: emotionsColors['Disgust']
    });
});

$(function() {
    $('#easypiechart-fear').easyPieChart({
        scaleColor: false,
        barColor: emotionsColors['Fear']
    });
});

$(function() {
   $('#easypiechart-joy').easyPieChart({
       scaleColor: false,
       barColor: emotionsColors['Joy']
   });
});

$(function() {
   $('#easypiechart-sadness').easyPieChart({
       scaleColor: false,
       barColor: emotionsColors['Sadness']
   });
});
