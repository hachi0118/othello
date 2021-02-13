<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>オセロゲーム</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div class="header">
    <p><span id="turn">黒</span>のターン</p>
    <div class="pass" onclick="pass();">パスする</div>
    <div>
      <p>黒の数：<span id="countBlack"></span></p>
      <p>白の数：<span id="countWhite"></span></p>
    </div>
  </div>
  <table class="background" border="1" cellspacing="0" bordercolor="#333333">
    <?php for ($j=1; $j<9; $j++) { ?>
      <tr>
        <?php for ($i=1; $i<9; $i++) { ?>
          <td class="<?php echo('square'.$i.$j); ?>" onclick="btn(<?php echo($i.','.$j); ?>)">
            <div class="<?php echo('piece'.$i.$j); ?>"></div>
          </td>
        <?php } ?>
      </tr>
    <?php } ?>
  </table>
</body>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="script.js"></script>
</html>