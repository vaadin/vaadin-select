gemini.suite('vaadin-dropdown-menu', function(rootSuite) {

  gemini.suite('dropdown-menu', function(suite) {
    suite
      .setUrl('/dropdown-menu.html')
      .setCaptureElements('#dropdown-menu')
      .capture('dropdown-menu', {}, (actions, find) => {
        actions.wait(6000);
      });
  });

});
