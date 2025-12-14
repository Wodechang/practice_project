from main import main


def test_main(capsys):
    main()
    captured = capsys.readouterr()
    assert "Hello from python_project" in captured.out
